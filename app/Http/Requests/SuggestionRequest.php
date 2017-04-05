<?php
/**
 * Created by PhpStorm.
 * User: bvnand01
 * Date: 24/02/2017
 * Time: 14:07
 */

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


class SUggestionRequest extends FormRequest
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
                    'statut' => 'required|integer',
                    'contenu' => 'required|max:255',
                    'user_id' => 'integer|exists:users,id'
                ];
            }
            case 'DELETE': {
                return [

                ];
            }
            case 'POST':
            {
                return [
                    'statut' => 'required|integer',
                    'contenu' => 'required|max:255',
                    'user_id' => 'required|integer|exists:users,id'

                ];
            }
            case 'PUT':
            {
                return [
                    'statut' => 'integer',
                    'contenu' => 'max:255',
                    'user_id' => 'integer|exists:users,id'
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