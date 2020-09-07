
@include('includes.header')

<link rel='stylesheet' href='css/loginAndRegister.css'>

<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css'>

<!-- to add flags and styling select -->
<!-- <msdropdown> -->
<link rel="stylesheet" type="text/css" href="css/dd.css" />
<!-- </msdropdown> -->
<link rel="stylesheet" type="text/css" href="css/flags.css" />


<div class="registerArea ">
  <div class="wrapper ">
    <form class="login @error('email') push-down is-active @else up @enderror validate-form " method="POST" action="{{ route('login') }}">
      @csrf
      
      <div class="profile"><i class="fa fa-sign-in"></i></div>
      
      <div class="form-element validate-input @error('email') has-invalid alert-validate @enderror" data-validate="@error('email'){{ $message }} @else{{ __('registerLogin.emailValidate') }} @enderror">
        <div class="ay7aga">
          <span><i class="fa fa-envelope"></i>  {{ __('registerLogin.email') }}:</span>
          <input name="email" type="email" placeholder="{{ __('registerLogin.emailPlaceholder') }}" value="{{ old('email') }}" required autocomplete="email" />
        </div>
      </div>
      
      <div class="form-element validate-input @error('password') has-invalid alert-validate @enderror" data-validate="@error('password'){{ $message }} @else{{ __('registerLogin.passwordValidate') }} @enderror">
        <div class="ay7aga">
          <span><i class="fa fa-lock"></i> {{ __('registerLogin.password') }}:</span>
          <input name="password" type="password" placeholder=" {{ __('registerLogin.passwordPlaceholder') }}" required autocomplete="current-password"/>
        </div>
      </div>


      <div class="form-element container-fluid" >
        <div class="ay7aga">
          <div class="check-input">
            <input class="" type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}/>
            <label>
                {{ __('registerLogin.remember') }}
            </label>
          </div>      
        </div>
      </div>

      <div class="form-element container-fluid" >
        <div class="ay7aga">
          @if (Route::has('password.request'))
              <a class="btn btn-link" href="{{ route('password.request') }}">
                  {{ __('registerLogin.forgot') }}
              </a>
          @endif
        </div>
      </div>
      
      <button type="submit" class="btn-login">{{ __('registerLogin.login') }}</button>
   
    </form>
    
    <form class="register @error('email') down @else is-active pull-up @enderror validate-form" method="POST" action="{{ route('register') }}">
      @csrf

      <div class="form-element validate-input @error('name') has-invalid alert-validate @enderror" data-validate="@error('name'){{ $message }} @else{{ __('registerLogin.nameValidate') }} @enderror">
        <div class="ay7aga">
          <span><i class="fa fa-user"></i> {{ __('registerLogin.name') }}:</span>
          <input  name="name" type="text" placeholder="{{ __('registerLogin.namePlaceholder') }}"value="{{ old('name') }}" required autocomplete="name"/>
        </div>
      </div>
      
      <div class="form-element validate-input @error('email_register') has-invalid alert-validate @enderror" data-validate="@error('email_register'){{ $message }} @else{{ __('registerLogin.emailValidateSignUp') }} @enderror ">
        <div class="ay7aga">
          <span><i class="fa fa-envelope"></i> {{ __('registerLogin.email') }}:</span>
          <input  name="email_register" type="email" placeholder="{{ __('registerLogin.emailPlaceholder') }}" value="{{ old('email_register') }}" required autocomplete="email"/>
        </div>
      </div>
      
      <div class="form-element validate-input @error('phone') has-invalid alert-validate @enderror" data-validate="@error('phone'){{ $message }} @else{{ __('registerLogin.phoneValidate') }} @enderror">
        <div class="ay7aga">
          <span><i class="fa fa-phone-square"></i> {{ __('registerLogin.phone') }}:</span>
          <input  name="phone" type="tel" placeholder="{{ __('registerLogin.phonePlaceholder') }}" value="{{ old('phone') }}" required autocomplete="phone"/>
        </div>
      </div>
      <div class="form-element container-fluid" >
        <div class="row p-t-20">
          <div class=" p-t-20 p-l-10 p-r-10 col-md-4">
              <div class=" select " >
                <select style="width:85%" class="tech" name="tech" id="countryId" >
                  <option value="0">{{ __('registerLogin.selectCountry') }}</option>  
                </select>
                <input type="hidden"  name="country" value="">
              </div>
          </div>

          
          <div class=" p-t-20 p-l-10 p-r-10 col-md-4">
            <div class="  select" >
                <select style="width:85%" class="tech" name="tech" id="stateId">
                    <option value="0">{{ __('registerLogin.selectState') }}</option>
                </select>
                <input type="hidden"  name="state" value="">
              </div>
          </div>

          <div class=" p-t-20 p-l-10 p-r-10 col-md-4">
              <div class="  select">
                <select style="width:85%" class="tech" name="tech" id="cityId">
                    <option value="0">{{ __('registerLogin.selectCity') }}</option>
                </select>
                <input type="hidden"  name="city" value="">
              </div>
          </div>

        </div>
      </div>
      <div class="form-element validate-input @error('address') has-invalid alert-validate @enderror" data-validate="@error('address'){{ $message }} @else{{ __('registerLogin.addressValidate') }} @enderror">
        <div class="ay7aga">
          <span><i class="fa fa-map-marker"></i> {{ __('registerLogin.address') }}:</span>
          <input  name="address" type="text" placeholder="{{ __('registerLogin.addressPlaceholder') }}" value="{{ old('address') }}" required autocomplete="address"/>
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
      
      <button type="submit" class="btn-login">{{ __('registerLogin.signUp') }}</button>
    </form>
    
    <div class="login-view-toggle @error('email') move-bottom  @else move-top @enderror">
      <div class="sign-up-toggle @error('email') is-active @enderror">{{ __('registerLogin.notHaveAcc') }} <a href="#">{{ __('registerLogin.signUp') }}</a></div>
      <div class="login-toggle @error('email') @else is-active @enderror"><i class="fa fa-reply"></i> {{ __('registerLogin.haveAcc') }} <a href="#">{{ __('registerLogin.login') }}</a></div>
    </div>
  </div>
</div>

<script src='https://code.jquery.com/jquery-2.2.4.min.js'></script>
<script src='js/loginAndRegister.js'></script>



<!-- to get countries and their stats and their cities -->
 <!-- <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script> -->
 <!--  <script src="//geodata.solutions/includes/countrystatecity.js"></script> -->
  
  <!-- by myself from geoname api -->
  <script src='js/country state city.js'></script>

<!-- to add flags and styling select -->
<script src="js/jquery.dd.js"></script>



@include('includes.footer')