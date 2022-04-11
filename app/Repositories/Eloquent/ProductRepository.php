<?php
/**
 *  app/Repositories/Eloquent/ProductRepository.php
 *
 * Date-Time: 30.07.21
 * Time: 10:36
 * @author Insite LLC <hello@insite.international>
 */

namespace App\Repositories\Eloquent;


use App\Models\Product;
use App\Models\ProductAttributeValue;
use App\Repositories\Eloquent\Base\BaseRepository;
use App\Repositories\ProductRepositoryInterface;

/**
 * Class LanguageRepository
 * @package App\Repositories\Eloquent
 */
class ProductRepository extends BaseRepository implements ProductRepositoryInterface
{
    /**
     * @param \App\Models\Product $model
     */

    private $attributeRepository;

    public function __construct(Product $model,AttributeRepository $attributeRepository)
    {
        parent::__construct($model);
        $this->attributeRepository = $attributeRepository;
    }

    public function getPopularProducts(){
        $products = $this->model->where('popular',1)->whereHas('categories',function ($query){
            $query->where('status',1);
        })->with(['latestImage'])->inRandomOrder()->get();

        //dd($products);
        return $products;
    }

    private function checkSortAttributeAndGenerateQuery($query, $sort, $direction)
    {

            if ($sort === 'price') {
                $query->orderBy('price', $direction);
            } else {
                $query->orderBy($attribute->code, $direction);
            }


        return $query;
    }


    public function getAll($categoryId = null){


        //dd(request()->post());
        $params = request()->input();

        $query =  $this->model->select('products.*')
            ->leftJoin('product_categories', 'product_categories.product_id', '=', 'products.id')
            ->leftJoin('product_attribute_values','product_attribute_values.product_id','products.id');

        if ($categoryId) {
            $query->whereIn('product_categories.category_id', explode(',', $categoryId));
        }


        # sort direction
        $orderDirection = 'asc';
        $sortOptions = ['created_at','desc'];
        if (isset($params['order']) && in_array($params['order'], ['desc', 'asc'])) {
            $orderDirection = $params['order'];
        } else {


            $orderDirection = ! empty($sortOptions) ? $sortOptions[1] : 'asc';
        }

        if (isset($params['sort'])) {
            $query->orderBy($params['sort'], $orderDirection);
        } else {

            if (! empty($sortOptions)) {
                $query->orderBy($sortOptions[0], $orderDirection);
            }
        }


        if($priceFilter = request('price')){
            $priceRange = explode(',', $priceFilter);

            $query->where(function ($pQ) use ($priceRange){
                $pQ->where('products.price', '>=', $priceRange[0])
                    ->where('products.price', '<=', end($priceRange));
            });

        }


        $attributes = $this->attributeRepository->getFilterAttributes(array_keys(request()->except('price') ? request()->except('price') : []));

        if (count($attributes) > 0) {
            $query->where(function ($fQ) use ($attributes) {
                foreach ($attributes as $attribute) {
                    $fQ->orWhere(function ($aQ) use ($attribute) {
                        $column = 'product_attribute_values.' . ProductAttributeValue::$attributeTypeFields[$attribute->type];

                        $filterInputValues = explode(',', request()->get($attribute->code));

                        # attribute we are filtering
                        $aQ = $aQ->where('product_attribute_values.attribute_id', $attribute->id);

                        $aQ->where(function ($attributeValueQuery) use ($column, $filterInputValues) {

                            if(is_array($filterInputValues)){
                                foreach ($filterInputValues as $filterValue) {
                                    if (!is_numeric($filterValue)) {
                                        continue;
                                    }
                                    $attributeValueQuery->orWhereRaw("find_in_set(?, {$column})", [$filterValue]);
                                }
                            } else {
                                if (is_numeric($filterInputValues)) {
                                    $attributeValueQuery->orWhereRaw("find_in_set(?, {$column})", [$filterInputValues]);
                                }

                            }

                        });
                    });


                }
            });
        }

        $query->groupBy('products.id');
        return $query->with('latestImage')->paginate('2')->withQueryString();
    }


    public function getMaxPrice(){
        return $this->model->max('price');
    }
    public function getMinPrice(){
        return $this->model->min('price');
    }


}
