<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        switch ($this->method()) {
            case 'POST':
                return [
                    'name' => 'required|string|min:5',
                    'email' => 'required|email|unique:users,email',
                    'password' => 'required|string|min:8|max:12|confirmed',
                    'role' => 'required|string',
                ];
                break;
            case 'PUT':
                return [
                    'name' => 'sometimes|required|string|min:5',
                    'foto' => 'sometimes|image',
                    'email' => 'sometimes|required|email|unique:users,email',
                    'old_password' => 'sometimes|required_with:new_password|string|min:8|max:12|current_password',
                    'new_password' => 'sometimes|string|min:8|max:12|confirmed|same_password'
                ];
                break;
            default:
                break;
        }
    }
}
