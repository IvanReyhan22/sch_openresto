<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReserveRequest extends FormRequest
{
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
        switch ($this->method()) {
            case 'POST':
                return [
                    'restoran_id' => 'required|numeric|exists:restoran,id',
                    'meja_id[]' => 'numeric',
                    'menu_id[]' => 'sometimes|required|numeric',
                    'qty[]' => 'sometimes|required|numeric',
                    'mulai' => 'required|date_format:Y-m-d H:i:s',
                    'selesai' => 'required|date_format:Y-m-d H:i:s|after:mulai',
                ];
                break;
            case 'PUT':
                return [
                    'paid' => 'sometimes|required|numeric',
                ];
                break;
            default:
                break;
        }
    }
}
