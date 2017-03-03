<?php
/**
 * Created by PhpStorm.
 * User: bvnand01
 * Date: 24/02/2017
 * Time: 14:07
 */

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VisiteRequest extends FormRequest
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
                    'personne' => 'max:255',
                    'raison' => 'max:255',
                    'prospect' => 'max:255',
                    'opportunite' => 'max:255',
                    'proposition' => 'max:255',
                    'somme'=>'integer',
                    'client_id' => 'required|integer|exists:clients,id',
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
                    'personne' => 'max:255',
                    'raison' => 'max:255',
                    'prospect' => 'max:255',
                    'opportunite' => 'max:255',
                    'proposition' => 'max:255',
                    'somme'=>'integer',
                    'client_id' => 'required|integer|exists:clients,id',
                    'date' => 'required|date|date_format:"Y-m-d"'

                ];
            }
            case 'PUT':
            {
                return [
                    'personne' => 'max:255',
                    'raison' => 'max:255',
                    'prospect' => 'max:255',
                    'opportunite' => 'max:255',
                    'proposition' => 'max:255',
                    'somme'=>'integer',
                    'client_id' => 'required|integer|exists:clients,id',
                    'date' => 'required|date|date_format:"Y-m-d"'
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