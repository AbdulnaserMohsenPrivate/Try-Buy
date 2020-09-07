
@include('includes.header')

<link rel='stylesheet' href="{{asset('css/loginAndRegister.css')}}">

<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css'>




<div class="registerArea ">	
  <div class="wrapper ">
    <form class="login is-active validate-form" method="POST" action="{{route('password.email')}}">
      @csrf
      
      @if (session('status'))
        <div class="alert alert-success" role="alert">
            {{ session('status') }}
        </div>
      @endif
      <div class="profile"><i class="fa fa-wrench"></i></div>
      
      <div class="form-element validate-input @error('email') has-invalid alert-validate @enderror" data-validate="@error('email'){{ $message }} @else{{ __('registerLogin.emailValidate') }} @enderror">
        <div class="ay7aga">
          <span><i class="fa fa-envelope"></i>  {{ __('registerLogin.email') }}:</span>
          <input name="email" type="email" placeholder="{{ __('registerLogin.emailPlaceholder') }}" value="{{ old('email') }}" required autocomplete="email" />
        </div>
      </div>

      <button type="submit" class="btn-login">{{ __('registerLogin.sendPasswordResetLink') }}</button>
   
    </form>
    
  </div>
</div>

<script src='https://code.jquery.com/jquery-2.2.4.min.js'></script>
<script src="{{asset('js/loginAndRegister.js')}}"></script>

  



@include('includes.footer')