<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" @if(app()->getLocale()=="en" )dir="ltr" @else dir="rtl" @endif>
    <head>
    	<title>{{ __('header.title') }}</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
	<!--===============================================================================================-->	
		<link rel="icon" type="image/png" href="{{asset('')}}{{ __('header.smallLogo') }}"/>
		<link rel="stylesheet" type="text/css" href="{{asset('css/error 404.css')}}">
	</head>
<h1>{{ __('errors.sorry') }}</h1>
<p class="zoom-area"><b>{{ __('errors.not_found') }}</b> </p>
<section class="error-container">
  <span>4</span>
  <span><span class="screen-reader-text">0</span></span>
  <span>4</span>
</section>
<div class="link-container">
  <a 2 href="/" class="more-link">{{ __('errors.home') }}</a>
</div>