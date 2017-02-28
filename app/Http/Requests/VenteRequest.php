<?php
/**
 * Created by PhpStorm.
 * User: bvnand01
 * Date: 24/02/2017
 * Time: 14:07
 */

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VenteRequest extends FormRequest
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
                    'produit_id' => 'required|integer|exists:produits,id',
                    'client_id' => 'required|integer|exists:clients,id',
                    'quantite' => 'required|max:255',
                    'date' => 'required|date|date_format:"Y-m-d"'
                ];
            }
            case 'DELETE': {
                return [

                ];
            }
            case 'POST':
            {
                return [
                    'produit_id' => 'required|integer|exists:produits,id',
                    'client_id' => 'required|integer|exists:clients,id',
                    'quantite' => 'required|max:255',
                    'date' => 'required|date|date_format:"Y-m-d"'

                ];
            }
            case 'PUT':
            {
                return [
                    'produit_id' => 'integer|exists:produits,id',
                    'client_id' => 'integer|exists:clients,id',
                    'quantite' => 'max:255',
                    'date' => 'date|date_format:"Y-m-d"'
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