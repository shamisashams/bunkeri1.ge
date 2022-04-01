<?php
/**
 *  app/Repositories/Eloquent/ProductRepository.php
 *
 * Date-Time: 30.07.21
 * Time: 10:36
 * @author Insite LLC <hello@insite.international>
 */

namespace App\Repositories\Eloquent;


use App\Models\Attribute;
use App\Repositories\AttributeRepositoryInterface;
use App\Repositories\Eloquent\Base\BaseRepository;


/**
 * Class LanguageRepository
 * @package App\Repositories\Eloquent
 */
class AttributeRepository extends BaseRepository implements AttributeRepositoryInterface
{
    /**
     * @param \App\Models\Product $model
     */
    public function __construct(Attribute $model)
    {
        parent::__construct($model);
    }




}
