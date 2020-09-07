
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
    <form class="login is-active validate-form ">
      <div class="profile"><i class="fa fa-sign-in"></i></div>
      <div class="form-element validate-input" data-validate="{{ __('registerLogin.emailValidate') }}">
        <div class="ay7aga">
          <span><i class="fa fa-envelope"></i>  {{ __('registerLogin.email') }}:</span>
          <input class="" name="email" type="email" placeholder="{{ __('registerLogin.emailPlaceholder') }}"/>
        </div>
      </div>
      <div class="form-element validate-input" data-validate="{{ __('registerLogin.passwordValidate') }}">
        <div class="ay7aga">
          <span><i class="fa fa-lock"></i> {{ __('registerLogin.password') }}:</span>
          <input name="password" type="password" placeholder=" {{ __('registerLogin.passwordPlaceholder') }}"/>
        </div>
      </div>
      <button class="btn-login">{{ __('registerLogin.login') }}</button>
    </form>
    
    <form class="register down validate-form">
      <div class="form-element validate-input" data-validate="{{ __('registerLogin.nameValidate') }}">
        <div class="ay7aga">
          <span><i class="fa fa-user"></i> {{ __('registerLogin.name') }}:</span>
          <input name="name" type="text" placeholder="{{ __('registerLogin.namePlaceholder') }}"/>
        </div>
      </div>
      <div class="form-element validate-input" data-validate="{{ __('registerLogin.emailValidateSignUp') }}">
        <div class="ay7aga">
          <span><i class="fa fa-envelope"></i> {{ __('registerLogin.email') }}:</span>
          <input name="email" type="email" placeholder="{{ __('registerLogin.emailPlaceholder') }}"/>
        </div>
      </div>
      <div class="form-element validate-input" data-validate="{{ __('registerLogin.phoneValidate') }}">
        <div class="ay7aga">
          <span><i class="fa fa-phone-square"></i> {{ __('registerLogin.phone') }}:</span>
          <input name="phone" type="tel" placeholder="{{ __('registerLogin.phonePlaceholder') }}"/>
        </div>
      </div>
      <div class="form-element container-fluid" >
        <div class="row p-t-20">
          <div class=" p-t-20 p-l-10 p-r-10 col-md-4">
              <div class=" select " >
                <select style="width:85%" class="tech" name="tech" id="countryId" >
                  <option value="0">{{ __('registerLogin.selectCountry') }}</option>  
                </select>
              </div>
          </div>

          
          <div class=" p-t-20 p-l-10 p-r-10 col-md-4">
            <div class="  select" >
                <select style="width:85%" class="tech" name="tech" id="stateId">
                    <option value="0">{{ __('registerLogin.selectState') }}</option>
                </select>
              </div>
          </div>

          <div class=" p-t-20 p-l-10 p-r-10 col-md-4">
              <div class="  select">
                <select style="width:85%" class="tech" name="tech" id="cityId">
                    <option value="0">{{ __('registerLogin.selectCity') }}</option>
                </select>
              </div>
          </div>

        </div>
      </div>
      <div class="form-element validate-input" data-validate="{{ __('registerLogin.addressValidate') }}">
        <div class="ay7aga">
          <span><i class="fa fa-map-marker"></i> {{ __('registerLogin.address') }}:</span>
          <input name="address" type="text" placeholder="{{ __('registerLogin.addressPlaceholder') }}"/>
        </div>
      </div>
      <div class="form-element validate-input" data-validate=" {{ __('registerLogin.passwordValidateSignUp') }} ">
        <div class="ay7aga">
          <span><i class="fa fa-lock"></i> {{ __('registerLogin.password') }}:</span>
          <input id="password" name="password" type="password" placeholder="{{ __('registerLogin.passwordPlaceholder') }}"/>
        </div>
      </div>
      <div class="form-element validate-input" data-validate="{{ __('registerLogin.confirmPasswordValidate') }}">
        <div class="ay7aga">
          <span><i class="fa fa-lock"></i> {{ __('registerLogin.confirmPassword') }}:</span>
          <input name="confirm-password" type="password" placeholder="{{ __('registerLogin.confirmPasswordPlaceholder') }}"/>
        </div>
      </div>
      <button class="btn-login">{{ __('registerLogin.signUp') }}</button>
    </form>
    
    <div class="login-view-toggle ">
      <div class="sign-up-toggle is-active">{{ __('registerLogin.notHaveAcc') }} <a href="#">{{ __('registerLogin.signUp') }}</a></div>
      <div class="login-toggle"><i class="fa fa-reply"></i> {{ __('registerLogin.haveAcc') }} <a href="#">{{ __('registerLogin.login') }}</a></div>
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