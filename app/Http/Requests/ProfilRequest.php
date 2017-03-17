<?php
/**
 * Created by PhpStorm.
 * User: bvnand01
 * Date: 24/02/2017
 * Time: 14:07
 */

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


class ProfilRequest extends FormRequest
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
                    'nom' => 'required|max:255'
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
                    'utilisateur' => 'required|max:1',
                    'categorie' => 'required|max:1',
                    'client' => 'required|max:1',
                    'produit' => 'required|max:1',
                    'profil' => 'required|max:1',
                    'rapport' => 'required|max:1',
                    'bilan_national' => 'required|max:1',
                    'bilan_ville' => 'required|max:1'

                ];
            }
            case 'PUT':
            {
                return [
                    'nom' => 'max:255',
                    'utilisateur' => 'max:1',
                    'categorie' => 'max:1',
                    'client' => 'max:1',
                    'produit' => 'max:1',
                    'profil' => 'max:1',
                    'bilan_ville' => 'max:1',
                    'bilan_national' => 'max:1',
                    'rapport' => 'max:1'
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