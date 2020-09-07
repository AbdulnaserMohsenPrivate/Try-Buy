@include('includes.header')



  <div id='wrapper'>
		<nav class='navbar navbar-inverse navbar-fixed-top' role='navigation'>
			<div class='navbar-header'>
				<button type='button' class='navbar-toggle' data-toggle='collapse' data-target='.navbar-hamburger-delicious'>
					<span class='sr-only'>Toggle navigation</span>
					<span class='icon-bar'></span>
					<span class='icon-bar'></span>
					<span class='icon-bar'></span>
				</button>
				<a class='navbar-brand' >Responsive Demo</a>
			</div>

			<div class='collapse navbar-collapse navbar-hamburger-delicious'>
				<ul class='nav navbar-nav side-nav fadeInLeft'>
					<li class='toggle-nav visible-lg visible-md visible-sm'><a><i class='fa fa-lg fa-arrow-left'></i>Hide Menu</a></li>
					<li class='dashboard'><a href='#'><i class='fa fa-lg fa-dashboard'></i>Dash</a></li>
					<li class='active docs'><a href='#docs'><i class='fa fa-lg fa-folder-open'></i>Docs</a></li>
					<li class='admin'><a href='#admin'><i class='fa fa-lg fa-user'></i>Admin</a></li>
					<li class='divider'><hr></li>
					<li class='person-lookup'><a href='#personLookup'><i class='fa fa-lg fa-phone-square'></i>Person Lookup</a></li>
					<li class='software-support'><a href='#softwareSupport'><i class='fa fa-lg fa-question-circle'></i>Support</a></li>
					<li class='dashboard-updates'><a href='#dashboardUpdates'><i class='fa fa-lg fa-arrow-up'></i>Updates</a></li>
					<li class='print'><a><i class='fa fa-lg fa-print'></i>Print</a></li>
				</ul>
				<ul class='nav navbar-nav navbar-right navbar-user'>
					<li class='dropdown user-dropdown'>
							<a href='#' class='dropdown-toggle' data-toggle='dropdown'><span class="js-user-name">Ryan Gill</span><b class='caret'></b></a>
							<ul class='dropdown-menu'>
									<li class='settings'><a href='#settings'><i class='fa fa-lg fa-gear'></i> Settings</a></li>
							</ul>
					</li>
				</ul>
			</div>

		</nav>

		<div id='page-wrapper'>
			<div class="container-fluid">
				<div class="row">
					
				</div>
				<div class="row">
					<div class="col-lg-12 col-md-12 col-xs-12 js-content">
					
					</div>
				</div>
			</div>

		</div>

	</div>









@include('includes.footer')