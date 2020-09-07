@include('includes.header')


<link rel='stylesheet' href='css/dash.css'>

		<nav class="main-menu-admin">
            <ul>
                <li>
                    <a href="#">
                        <i class="fa fa-tachometer fa-2x"></i>
                        <span class="nav-text">
                            {{ __('admin.dashboard') }}
                        </span>
                    </a>
                  
                </li>

                <li>
                    <a href="#">
                        <i class="fa fa-bar-chart-o fa-2x"></i>
                        <span class="nav-text">
                            {{ __('admin.statics') }}
                        </span>
                    </a>
                </li>
                
                <li class="has-subnav">
                    <a href="#">
                        <i class="fa fa-list-alt fa-2x"></i>
                        <span class="nav-text">
                            {{ __('admin.orders') }}
                        </span>
                    </a>
                    
                </li>
                <li class="has-subnav">
                    <a href="#">
                       <i class="fa fa-users fa-2x"></i>
                        <span class="nav-text">
                            {{ __('admin.users') }}
                        </span>
                    </a>
                    
                </li>
                <li class="has-subnav">
                    <a href="#">
                       <i class="fa fa-percent fa-2x"></i>
                        <span class="nav-text">
                            {{ __('admin.offers') }}
                        </span>
                    </a>
                   
                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-exchange fa-2x"></i>
                        <span class="nav-text">
                           {{ __('admin.contacts') }}
                        </span>
                    </a>
                </li>
                
            </ul>

            <ul class="logout">
                <li>
                   <a href="#">
                         <i class="fa fa-user fa-2x"></i>
                        <span class="nav-text">
                            {{ __('admin.asClient') }}
                        </span>
                    </a>
                </li>  
            </ul>
        </nav>

       <div class="">
	
			<!-- Banner -->
			<div class="sec-banner bg0 p-t-175 p-b-50">
				<div class="container">
					<div class="row">
						<div class="col-md-6 col-xl-4 p-b-30 m-lr-auto">
							<!-- Block1 -->
							<div class="block1 wrap-pic-w">
								<img src="images/glasses1.png" alt="IMG-BANNER">

								<a href="product.html" class="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
									<div class="block1-txt-child1 flex-col-l">
										<span class="block1-name ltext-102 trans-04 p-b-8">
											{{ __('admin.glasses') }}
										</span>

										<span class="block1-info stext-102 trans-04">
											{{ __('admin.all') }} {{ __('admin.glasses') }}
										</span>
									</div>

									<div class="block1-txt-child2 p-b-4 trans-05">
										<div class="block1-link stext-101 cl0 trans-09">
											{{ __('admin.addEditDelete') }}
										</div>
									</div>
								</a>
							</div>
						</div>

						<div class="col-md-6 col-xl-4 p-b-30 m-lr-auto">
							<!-- Block1 -->
							<div class="block1 wrap-pic-w">
								<img src="images/branding1.png" alt="IMG-BANNER">

								<a href="product.html" class="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
									<div class="block1-txt-child1 flex-col-l">
										<span class="block1-name ltext-102 trans-04 p-b-8">
											{{ __('admin.brands') }}
										</span>

										<span class="block1-info stext-102 trans-04">
											{{ __('admin.all') }} {{ __('admin.brands') }}
										</span>
									</div>

									<div class="block1-txt-child2 p-b-4 trans-05">
										<div class="block1-link stext-101 cl0 trans-09">
											{{ __('admin.addEditDelete') }}
										</div>
									</div>
								</a>
							</div>
						</div>

						<div class="col-md-6 col-xl-4 p-b-30 m-lr-auto">
							<!-- Block1 -->
							<div class="block1 wrap-pic-w">
								<img src="images/usage1.png" alt="IMG-BANNER">

								<a href="product.html" class="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
									<div class="block1-txt-child1 flex-col-l">
										<span class="block1-name ltext-102 trans-04 p-b-8">
											{{ __('admin.usages') }}
										</span>

										<span class="block1-info stext-102 trans-04">
											{{ __('admin.all') }} {{ __('admin.usages') }}
										</span>
									</div>

									<div class="block1-txt-child2 p-b-4 trans-05">
										<div class="block1-link stext-101 cl0 trans-09">
											{{ __('admin.addEditDelete') }}
										</div>
									</div>
								</a>
							</div>
						</div>

						<div class="col-md-6 col-xl-4 p-b-30 m-lr-auto">
							<!-- Block1 -->
							<div class="block1 wrap-pic-w">
								<img src="images/sunglasses1.png" alt="IMG-BANNER">

								<a href="product.html" class="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
									<div class="block1-txt-child1 flex-col-l">
										<span class="block1-name ltext-102 trans-04 p-b-8">
											{{ __('admin.types') }}
										</span>

										<span class="block1-info stext-102 trans-04">
											{{ __('admin.all') }} {{ __('admin.types') }}
										</span>
									</div>

									<div class="block1-txt-child2 p-b-4 trans-05">
										<div class="block1-link stext-101 cl0 trans-09">
											{{ __('admin.addEditDelete') }}
										</div>
									</div>
								</a>
							</div>
						</div>

						<div class="col-md-6 col-xl-4 p-b-30 m-lr-auto">
							<!-- Block1 -->
							<div class="block1 wrap-pic-w">
								<img src="images/color1.png" alt="IMG-BANNER">

								<a href="product.html" class="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
									<div class="block1-txt-child1 flex-col-l">
										<span class="block1-name ltext-102 trans-04 p-b-8">
											{{ __('admin.colors') }}
										</span>

										<span class="block1-info stext-102 trans-04">
											{{ __('admin.all') }} {{ __('admin.colors') }}
										</span>
									</div>

									<div class="block1-txt-child2 p-b-4 trans-05">
										<div class="block1-link stext-101 cl0 trans-09">
											{{ __('admin.addEditDelete') }}
										</div>
									</div>
								</a>
							</div>
						</div>



					</div>
				</div>
			</div>

		</div>






@include('includes.footer')