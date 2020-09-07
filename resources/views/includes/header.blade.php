<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" @if(app()->getLocale()=="en" )dir="ltr" @else dir="rtl" @endif>
<head>
	<title>{{ __('header.title') }}</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
<!--===============================================================================================-->	
	<link rel="icon" type="image/png" href="{{asset('')}}{{ __('header.smallLogo') }}"/>
<!--===============================================================================================-->
	<!-- Latest compiled and minified CSS -->
	@if(app()->getLocale()=="en" )
	<link rel="stylesheet" type="text/css" href="{{asset('vendor/bootstrap/css/bootstrap.min.css')}}">
	@else
	<link 
	  rel="stylesheet"
	  href="https://cdn.rtlcss.com/bootstrap/v4.0.0/css/bootstrap.min.css"
	  integrity="sha384-P4uhUIGk/q1gaD/NdgkBIl3a6QywJjlsFJFk7SPRdruoGddvRVSwv5qFnvZ73cpz"
	  crossorigin="anonymous">
	@endif
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="{{asset('fonts/font-awesome-4.7.0/css/font-awesome.min.css')}}">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="{{asset('fonts/iconic/css/material-design-iconic-font.min.css')}}">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="{{asset('fonts/linearicons-v1.0.0/icon-font.min.css')}}">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="{{asset('vendor/animate/animate.css')}}">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="{{asset('vendor/css-hamburgers/hamburgers.min.css')}}">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="{{asset('vendor/animsition/css/animsition.min.css')}}">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="{{asset('vendor/select2/select2.min.css')}}">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="{{asset('vendor/daterangepicker/daterangepicker.css')}}">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="{{asset('vendor/slick/slick.css')}}">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="{{asset('vendor/MagnificPopup/magnific-popup.css')}}">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="{{asset('vendor/perfect-scrollbar/perfect-scrollbar.css')}}">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="{{asset('css/util.css')}}">
	<link rel="stylesheet" type="text/css" href="{{asset('css/main.css')}}">
<!--===============================================================================================-->
<!-- me -->
<link rel="stylesheet" type="text/css" href="{{asset('css/ArabicFonts.css')}}">
<link rel="stylesheet" type="text/css" href="{{asset('css/developer.css')}}">
<link rel="stylesheet" type="text/css" href="{{asset('css/developer card.css')}}">




</head>
<body class="animsition hold-transition sidebar-mini layout-fixed">
	
	<!-- Header -->
	<header>
		<!-- Header desktop -->
		<div class="container-menu-desktop">
			<!-- Topbar -->
			<div class="top-bar">
				<div class="content-topbar flex-sb-m h-full container">
					<div class="left-top-bar">
						
					</div>

					<div class="right-top-bar flex-w h-full">

						<a href="#" class="flex-c-m trans-04 p-lr-25">
							{{ __('header.account') }}
						</a>

						<a @if(app()->getLocale()=="en" ) href="{{ url('lang/ar') }}" @else href="{{ url('lang/en') }}" @endif class="flex-c-m trans-04 p-lr-25">
							{{ __('header.lang') }}
						</a>

					</div>
				</div>
			</div>

			<div class="wrap-menu-desktop">
				<nav class="limiter-menu-desktop container">
					
					<!-- Logo desktop -->		
					<a href="{{route('index')}}" class="logo">
						<img src={{asset('')}}{{ __('header.logo') }} alt="IMG-LOGO">
					</a>

					<!-- Menu desktop -->
					<div class="menu-desktop">
						<ul class="main-menu">
							<li @if(url()->current() == route('index') ) class="active-menu" @endif>
								<a href="{{route('index')}}">{{ __('header.home') }}</a>
								
							</li>

							<li >
								<a href="product.html">{{ __('header.glasses') }}</a>
								<ul class="sub-menu">
									<li><a href="index.html">{{ __('header.women') }} <i class="fa fa-female"></i></a></li>
									<li><a href="home-02.html">{{ __('header.men') }} <i class="fa fa-male"></i></a></li>
									<li><a href="home-03.html">{{ __('header.kids') }} <i class="fa fa-child"></i></a></li>
								</ul>
							</li>


							<li>
								<a href="about.html">{{ __('header.about') }}</a>
							</li>
							
							<li>
								<a href="contact.html">{{ __('header.contact') }}</a>
							</li>
						</ul>
					</div>	

					<!-- Icon header -->
					
					<div class="wrap-icon-header flex-w flex-r-m">
						
						@if(!Auth::check())
						<!-- for guests -->
							<a href="{{ route('register') }}"  class="@error('email_register') active-hov-cl1 @enderror @error('email') @elseif(url()->current() == route('register') ) active-hov-cl1 @enderror icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11">
								<i class="zmdi zmdi-account-add">
									<p>{{ __('header.register') }}</p>
								</i>
							</a>
							
							<a href="{{ route('login') }}" class="@error('email') active-hov-cl1 @enderror @error('email_register') @elseif(url()->current() == route('login') ) active-hov-cl1 @enderror icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11  ">
								<i class="zmdi zmdi-account">
									<p>{{ __('header.login') }}</p>
								</i>
							</a>
						@endif

						
						@if(Auth::check())
						<!-- for users  -->

							@if(Auth::user()->type > 0)
							<!-- for admins and super admins -->
								@if($page == 1 )
								<a href="{{ route('admin') }}" class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11  ">
									<i class="zmdi zmdi-settings"><p>{{ __('header.admin') }}</p></i>
								</a>
								@endif

								@if($page == 2 )
									<a href="{{ route('index') }}" class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11  ">
										<i class="zmdi zmdi-account-o"><p>{{ __('header.client') }}</p></i>
									</a>
								@endif
							@endif
						
							<div class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti dropdown" data-notify="2">
								<i class="zmdi zmdi-account"></i>
								<div class="dropdown-content">
								  <a href="profile.html">{{ __('header.profile') }} <i class="fa fa-address-card-o"></i></a>
								  <a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
								  	{{ __('header.Logout') }} 
								  	<i class="fa fa-power-off"></i>
								  </a>
								  <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                   </form>
								</div>
								
							</div>

							
							
							<a href="#" class="dis-block icon-header-item favo cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti" data-notify="0">
								<i class="zmdi "></i>
							</a>
							
							
							
							<!-- Cart -->
		
								<div class="dropdown">
									
									<div class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart" data-notify="2" data-toggle="dropdown" aria-expanded="false">
										<i class="zmdi zmdi-shopping-cart"></i>
									</div>
									
									
									<div class="dropdown-menu dropdown-menu-right">
										<div class="cart-dropdown ">
											<div class="cart-list ">
												<div class="product-widget">
													<div class="product-img">
														<img src="./images/product01.png" alt="">
													</div>
													<div class="product-body">
														<h3 class="product-name">product name goes here</h3>
														<h4 class="product-price"><span class="qty">1x</span>$980.00</h4>
													</div>
													<button class="delete"><i class="fa fa-close"></i></button>
												</div>

												<div class="product-widget">
													<div class="product-img">
														<img src="./images/product02.png" alt="">
													</div>
													<div class="product-body">
														<h3 class="product-name">product name goes here</h3>
														<h4 class="product-price"><span class="qty">3x</span>$980.00</h4>
													</div>
													<button class="delete"><i class="fa fa-close"></i></button>
												</div>
											</div>
											<div class="cart-summary">
												<small>3 Item(s) selected</small>
												<h5>SUBTOTAL: $2940.00</h5>
											</div>
											<div class="cart-btns">
												<a href="cart.html">{{ __('header.cart') }}</a>
												<a href="checkOut.html">{{ __('header.checkout') }}  
													@if(app()->getLocale()=="en" )
														<i class="fa fa-arrow-circle-right"></i>
													@else
														<i class="fa fa-arrow-circle-left"></i>
													@endif
												</a>
											</div>
										</div>
									</div>
								</div>
								<!-- /Cart -->
							@endif	
						
					</div>
				</nav>
			</div>	
		</div>

		<!-- Header Mobile -->
		<div class="wrap-header-mobile" >
			<!-- Logo moblie -->		
			<div class="logo-mobile">
				<a href="{{route('index')}}"><img src={{asset('')}}{{ __('header.logo') }} alt="IMG-LOGO"></a>
			</div>

			<!-- Icon header -->
			<div class="wrap-icon-header flex-w flex-r-m m-r-15">
				
				@if(!Auth::check())
				<!-- for guests -->
					<a href="{{ route('register') }}" class="icon-header-item cl2 hov-cl1 trans-04 p-r-11 js-show-modal-search">
						<i class="zmdi zmdi-account-add"><p>{{ __('header.register') }}</p></i>
					</a>
					
					<a href="{{ route('login') }}" class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11  ">
						<i class="zmdi zmdi-account"><p>{{ __('header.login') }}</p></i>
						
					</a>
				@endif

				@if(Auth::check())
				<!-- for users  -->

					@if(Auth::user()->type > 0)
					<!-- for admins and super admins -->
						@if($page == 1 )
						<a href="{{ route('admin') }}" class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11  ">
							<i class="zmdi zmdi-settings"><p>{{ __('header.admin') }}</p></i>
						</a>
						@endif

						@if($page == 2 )
							<a href="{{ route('index') }}" class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11  ">
								<i class="zmdi zmdi-account-o"><p>{{ __('header.client') }}</p></i>
							</a>
						@endif
					@endif
				
					<div class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti dropdown" data-notify="2">
						<i class="zmdi zmdi-account"></i>
						<div class="dropdown-content">
						  <a href="#">{{ __('header.profile') }}</a>
						  <a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
						  	{{ __('header.Logout') }} 
						  	<i class="fa fa-power-off"></i>
						  </a>
						  <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                @csrf
                           </form>
						</div>
						
					</div>
					

					<a href="#" class="dis-block icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti" data-notify="0">
						<i class="zmdi zmdi-favorite-outline"></i>
					</a>
					
					<!-- Cart -->
					<div class="dropdown">
						<div class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart" data-notify="9" data-toggle="dropdown" aria-expanded="false">
							<i class="zmdi zmdi-shopping-cart"></i>
						</div>
						
						<div class="dropdown-menu dropdown-menu-right">
							<div class="cart-dropdown ">
								<div class="cart-list ">
									<div class="product-widget">
										<div class="product-img">
											<img src="./images/product01.png" alt="">
										</div>
										<div class="product-body">
											<h3 class="product-name">product name goes here</h3>
											<h4 class="product-price"><span class="qty">1x</span>$980.00</h4>
										</div>
										<button class="delete"><i class="fa fa-close"></i></button>
									</div>

									<div class="product-widget">
										<div class="product-img">
											<img src="./images/product02.png" alt="">
										</div>
										<div class="product-body">
											<h3 class="product-name">product name goes here</h3>
											<h4 class="product-price"><span class="qty">3x</span>$980.00</h4>
										</div>
										<button class="delete"><i class="fa fa-close"></i></button>
									</div>
								</div>
								<div class="cart-summary">
									<small>3 Item(s) selected</small>
									<h5>SUBTOTAL: $2940.00</h5>
								</div>
								<div class="cart-btns">
									<a href="cart.html">{{ __('header.cart') }}</a>
									<a href="checkOut.html">{{ __('header.checkout') }} 
										@if(app()->getLocale()=="en" )
											<i class="fa fa-arrow-circle-right"></i>
										@else
											<i class="fa fa-arrow-circle-left"></i>
										@endif
									</a>
								</div>
							</div>
						</div>
					</div>
					<!-- /Cart -->
					@endif

			</div>

			<!-- Button show menu -->
			<div class="btn-show-menu-mobile hamburger hamburger--squeeze">
				<span class="hamburger-box">
					<span class="hamburger-inner"></span>
				</span>
			</div>
		</div>


		<!-- Menu Mobile -->
		<div class="menu-mobile">
			<ul class="topbar-mobile">

				<li>
					<div class="right-top-bar flex-w h-full">
						<a href="#" class="flex-c-m p-lr-10 trans-04">
							{{ __('header.account') }}
						</a>

						<a @if(app()->getLocale()=="en" ) 
							href="{{ url('lang/ar') }}" 
						   @else href="{{ url('lang/en') }}" 
						   @endif class="flex-c-m p-lr-10 trans-04">
							{{ __('header.lang') }}
						</a>

					</div>
				</li>
			</ul>

			<ul class="main-menu-m">
				<li>
					<a href="{{route('index')}}">{{ __('header.home') }}</a>
				</li>
				
				<li>
					<a href="product.html">{{ __('header.glasses') }}</a>
					<ul class="sub-menu-m">
						<li><a href="index.html">{{ __('header.women') }}</a></li>
						<li><a href="home-02.html">{{ __('header.men') }}</a></li>
						<li><a href="home-03.html">{{ __('header.kids') }}</a></li>
					</ul>
					<span class="arrow-main-menu-m">
						<i class="fa fa-angle-down" aria-hidden="true"></i>
					</span>
				</li>


				<li>
					<a href="contact.html" class="label1 rs1" data-label1="hot">{{ __('header.contact') }}</a>
				</li>


				<li>
					<a href="about.html">{{ __('header.about') }}</a>
				</li>

			</ul>
		</div>

		
	</header>
