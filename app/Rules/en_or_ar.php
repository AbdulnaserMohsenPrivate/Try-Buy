<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class en_or_ar implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return (preg_match('/^[a-zA-Z ]+$/',$value) || (preg_match('/^[\p{Arabic} ]+$/u',$value)));
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
    	return  __('registerLogin.nameValidate');
    }
}
