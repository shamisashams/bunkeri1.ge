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
        })->with(['files'])->inRandomOrder()->get();

        //dd($products);
        return $products;
    }


    public function getAll($categoryId = null){

        $attributes = $this->attributeRepository->getFilterAttributes(array_keys(request()->post('filter') ? request()->post('filter') : []));

        //dd(request()->post());

        $query =  $this->model->select('products.*')
            ->leftJoin('product_attribute_values','product_attribute_values.product_id','products.id');

        if (count($attributes) > 0) {
            $query->where(function ($fQ) use ($attributes) {
                foreach ($attributes as $attribute) {
                    $fQ->orWhere(function ($aQ) use ($attribute) {
                        $column = 'product_attribute_values.' . ProductAttributeValue::$attributeTypeFields[$attribute->type];

                        $filterInputValues = request()->post('filter')[$attribute->code];

                        # attribute we are filtering
                        $aQ = $aQ->where('product_attribute_values.attribute_id', $attribute->id);

                        $aQ->where(function ($attributeValueQuery) use ($column, $filterInputValues) {
                            foreach ($filterInputValues as $filterValue) {
                                if (!is_numeric($filterValue)) {
                                    continue;
                                }
                                $attributeValueQuery->orWhereRaw("find_in_set(?, {$column})", [$filterValue]);
                            }
                        });
                    });


                }
            });
        }

        $query->groupBy('products.id');
        return $query->get();
    }

}
