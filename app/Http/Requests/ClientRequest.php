<?php
/**
 * Created by PhpStorm.
 * User: bvnand01
 * Date: 24/02/2017
 * Time: 14:07
 */

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


class ClientRequest extends FormRequest
{
    public function wantsJson()
    {
        return true;
    }
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        switch($this->method())
        {
            case 'GET':
            {
                return [
                    'id' => 'required|integer',
                    'nom' => 'required|max:255',
                    'email' => 'max:255',
                    'ville' => 'max:255',
                    'adresse' => 'max:255',
                    'telephone' => 'integer',
                    'boite_postale' => 'integer',
                    'categorie_id' => 'integer|exists:categories,id'
                ];
            }
            case 'DELETE': {
                return [

                ];
            }
            case 'POST':
            {
                return [
                    'nom' => 'required|max:255',
                    'email' => 'email|unique:clients|max:255',
                    'ville' => 'max:255',
                    'adresse' => 'max:255',
                    'telephone' => 'integer',
                    'boite_postale' => 'integer',
                    'categorie_id' => 'required|integer|exists:categories,id'
                ];
            }
            case 'PUT':
            {
                return [
                    'nom' => 'max:255',
                    'email' => 'email|unique:clients|max:255',
                    'ville' => 'max:255',
                    'adresse' => 'max:255',
                    'telephone' => 'integer',
                    'boite_postale' => 'integer',
                    'categorie_id' => 'integer|exists:categories,id'
                ];
            }
            case 'PATCH':
            {
                return [
                ];
            }
            default:break;
        }

    }
}