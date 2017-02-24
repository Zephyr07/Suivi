<?php
/**
 * Created by PhpStorm.
 * User: bvnand01
 * Date: 24/02/2017
 * Time: 14:07
 */

namespace App\Http\Requests;


class VenteRequest
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
                    'produit_id' => 'required|integer|exists:produit,id',
                    'client_id' => 'required|integer|exists:client,id',
                    'quantite' => 'required|max:255',
                    'date' => 'required|date|date_format:"Y-m-d H:i:s"'
                ];
            }
            case 'DELETE': {
                return [

                ];
            }
            case 'POST':
            {
                return [
                    'id' => 'required|integer',
                    'produit_id' => 'required|integer|exists:produit,id',
                    'client_id' => 'required|integer|exists:client,id',
                    'quantite' => 'required|max:255',
                    'date' => 'required|date|date_format:"Y-m-d H:i:s"'

                ];
            }
            case 'PUT':
            {
                return [
                    'id' => 'required|integer',
                    'produit_id' => 'required|integer|exists:produit,id',
                    'client_id' => 'required|integer|exists:client,id',
                    'quantite' => 'required|max:255',
                    'date' => 'required|date|date_format:"Y-m-d H:i:s"'

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