<?php

namespace App\Http\Controllers;

use App\Repositories\Eloquent\AttributeRepository;
use Illuminate\Http\Request;

use App\Repositories\Eloquent\ProductAttributeValueRepository;

use App\Repositories\Eloquent\ProductRepository;

class TestController extends Controller
{
    //
    protected $productAttributeValueRepository;

    protected $attributeRepository;

    protected $productRepository;

    public function __construct(
        ProductAttributeValueRepository $productAttributeValueRepository,
        AttributeRepository $attributeRepository,
        ProductRepository $productRepository
    )
    {
        $this->productAttributeValueRepository = $productAttributeValueRepository;
        $this->attributeRepository = $attributeRepository;
        $this->productRepository = $productRepository;
    }

    public function at(){
        $result = [];
        $attr_values = $this->productAttributeValueRepository->model->all();
        foreach ($attr_values as $item){

            $result[$item->attribute_id][] = $item;


        }
        //$result = array_unique($result);
        dd($result);
    }

    public function attr(){
        $attrs = $this->attributeRepository->model->with('options')->get();

        return view('test',compact('attrs'));
    }

    public function filter(Request $request){
        dd($request->all());
    }
}
