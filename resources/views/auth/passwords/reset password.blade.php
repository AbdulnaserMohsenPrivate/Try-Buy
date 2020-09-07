
@include('includes.header')

<link rel='stylesheet' href="{{asset('css/loginAndRegister.css')}}">

<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css'>




<div class="registerArea ">	
  <div class="wrapper ">
    <form class="login is-active validate-form" method="POST" action="{{ route('password.update') }}">
      @csrf
      <input type="hidden" name="token" value="{{ $token }}">
      
      @if (session('status'))
        <div class="alert alert-success" role="alert">
            {{ session('status') }}
        </div>
      @endif
      <div class="profile"><i class="fa fa-wrench"></i></div>
      
      <div class="form-element validate-input @error('email') has-invalid alert-validate @enderror" data-validate="@error('email'){{ $message }} @else{{ __('registerLogin.emailValidate') }} @enderror">
        <div class="ay7aga">
          <span><i class="fa fa-envelope"></i>  {{ __('registerLogin.email') }}:</span>
          <input name="email" type="email" placeholder="{{ __('registerLogin.emailPlaceholder') }}" value="{{ $email ?? old('email') }}" required autocomplete="email" />
        </div>
      </div>
      
      <div class="form-element validate-input @error('password') has-invalid alert-validate @enderror" data-validate="@error('password'){{ $message }} @else {{ __('registerLogin.passwordValidateSignUp') }} @enderror">
        <div class="ay7aga">
          <span><i class="fa fa-lock"></i> {{ __('registerLogin.password') }}:</span>
          <input id="password" name="password" type="password" placeholder="{{ __('registerLogin.passwordPlaceholder') }}" required autocomplete="new-password"/>
        </div>
      </div>

      <div class="form-element validate-input" data-validate="{{ __('registerLogin.confirmPasswordValidate') }}">
        <div class="ay7aga">
          <span><i class="fa fa-lock"></i> {{ __('registerLogin.confirmPassword') }}:</span>
          <input  name="password_confirmation" type="password" placeholder="{{ __('registerLogin.confirmPasswordPlaceholder') }}" required autocomplete="new-password"/>
        </div>
      </div>
      <button type="submit" class="btn-login">{{ __('registerLogin.ResetPassword') }}</button>
   
    </form>
    
  </div>
</div>

<script src='https://code.jquery.com/jquery-2.2.4.min.js'></script>
<script src="{{asset('js/loginAndRegister.js')}}"></script>

  



@include('includes.footer')