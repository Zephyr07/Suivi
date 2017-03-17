<?php
/**
 * Created by PhpStorm.
 * User: bvnand01
 * Date: 24/02/2017
 * Time: 14:07
 */

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


class UserRequest extends FormRequest
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
                    'password' => 'max:255',
                    'profil_id' => 'integer|exists:profils,id'
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
                    'email' => 'required|email|unique:clients|max:255',
                    'password' => 'required|min:6',
                    'ville' => 'max:255',
                    'profil_id' => 'required|integer|exists:profils,id'
                ];
            }
            case 'PUT':
            {
                return [
                    'nom' => 'max:255',
                    'email' => 'email|unique:clients|max:255',
                    'ville' => 'max:255',
                    'password' => 'min:6',
                    'profil_id' => 'integer|exists:profils,id'
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