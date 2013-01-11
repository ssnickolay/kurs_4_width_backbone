namespace :db do
  desc "Fill database with sample data"
  task :populate => :environment do
    Rake::Task['db:reset'].invoke
    admin = User.create!(:name => "kolqa",
                 :email => "kolqa@qip.ru",
                 :password => "qwerty",
                 :password_confirmation => "qwerty")
	admin.toggle!(:admin)
    99.times do |n|
      name  = Faker::Name.name
      email = "example-#{n+1}@railstutorial.org"
      password  = "password"
	  User.create!(:name => name,
                   :email => email,
                   :password => password,
                   :password_confirmation => password)
	end
	User.all(:limit => 6).each do |user|
      5.times do |i|
        user.sites.create!(
		:title => "#{i} site #{user.name}'s",
		:header_html => '<li id ="b1" class="widget color-white"></li>',
		:left_column_html => '<li id = "b2" class="widget color-blue">
								<button class ="">Я Вконтакте</button>               
							  </li>',
		:right_column_html => '<li id ="b3" class="widget color-blue">  
									<h1>Календарь</h1>
									<div id="datepicker"></div>
								</li>
								<li id = "b4" class="widget color-blue">  
									<div id="accordion">
										<div>
											<h3><a href="#">First</a></h3>
											<div>Lorem </div>
										</div>
										<div>
											<h3><a href="#">Second</a></h3>
											<div>Phasellus </div>
										</div>
										<div>
											<h3><a href="#">Third</a></h3>
											<div>Nam </div>
										</div>
									</div>
								</li>',
		:central_column_html => '<li id="b5" class="widget color-blue">  
									<div id="tabs" class ="run_tabs">
										<ul>
											<li><a href="#tabs-1">First</a></li>
											<li><a href="#tabs-2">Second</a></li>
											<li><a href="#tabs-3">Third</a></li>
										</ul>
										<div id="tabs-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
										<div id="tabs-2">Phasellus mattis tincidunt nibh. Cras orci urna, blandit id, pretium vel, aliquet ornare, felis. Maecenas scelerisque sem non nisl. Fusce sed lorem in enim dictum bibendum.</div>
										<div id="tabs-3">Nam dui erat, auctor a, dignissim quis, sollicitudin eu, felis. Pellentesque nisi urna, interdum eget, sagittis et, consequat vestibulum, lacus. Mauris porttitor ullamcorper augue.</div>
									</div>        
								</li>',
		:footer_html => '<li id = "b6" class="widget color-blue"></li>',
		
		:css => 'body,img,p,h1,h2,h3,h4,h5,h6,ul,ol {margin:0; padding:0; list-style:none; border:none; font-family:Arial, Helvetica, sans-serif;}
					.ui-datepicker{width:auto;}
					body {font-size:0.8em; font-family:Arial,Verdana,Sans-Serif;height: 100%;
					 background:url("../img/pattern/pattern4.png") repeat;
					 background-color:#ccc;}
					a {color:white;}
					.round{
					-moz-border-radius:5px 5px 5px 5px;
					-webkit-border-radius:5px 5px 5px 5px;
					border-radius:5px 5px 5px 5px;
					}
					.color-blue   {background:#148ea4;}
					#columns{
					background:#eff4fa;
					}
					#columns .column {
					float: left;
					padding: 2px;
					margin:5px 5px 0px 0px;
					}
					#main{
					 width:1000px; margin:0 auto;  height:680px;
					 background:url("../img/pattern/pattern8.png") repeat;
					 background-color:#0e5a87;
					 border: 2px solid #fff; 
					 }
					#columns #column_head{width:99.5%;}
					#columns #column_head_1 {height:200px; width:990px; margin:0px auto; 
					background: url("../images/header_bg.png");}
					#columns #column_right{width:200px;}
					#columns #column_left{width:169px; margin-left:4px;}
					#columns #column_left_1 {height:70px; margin:40% auto;}
					#columns #column_left_1 button{width:100%; height:100%}
					#columns #column_center{ width:600px;}
					#columns #column_center_1 {height:400px;}
					#columns #column_center_1 .run_tabs{width:100%; height:100%}
					#columns #column_footer{width:99.5%;}
					#columns #column_footer_1 {height:40px; width:990px; margin:0px auto; margin-bottom:20px;
					background: url("../images/footer_bg.png");}'
					)
      end
    end
  end
end