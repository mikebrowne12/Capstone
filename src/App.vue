<template>
  <div id="app">
        <main class="container left-container">
            <div class="row">

                <div id="menu-target">
                    <ul>
                        <li><i class="fa fa-user"></i><a href="/login">Login</a></li>
                        <li><i class="fa fa-anchor"></i><a href="/logout">Logout</a></li>
                        <li><i class="fa fa-paper-plane"></i><a href="/Signup">Signup</a></li>
                    </ul>
                    <hr>
                    <ul>
                        <li><i class="fa fa-home"></i><a href="/">Home</a></li>
                        <li><i class="fa fa-user"></i><a href="/attractions">Attractions</a></li>
                        <li><i class="fa fa-star"></i><a href="favorites.html">Favorites</a></li>
                    </ul>
                    <hr>
                </div>

                <section class="sidebar col-lg-7 col-12" style="background-image: url(https://d1dmo9iwh0r4qt.cloudfront.net/~/media/ai/main/images/chicago/local-campus-landing-page/chicago_thinkstockphotos-511665488_1300x700-min.ashx?modified=20160902000002">

                    <span class="menu-trigger animated fadeInDown">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </span>

                    <div class="site-info">
                        <div class="primary-info">
                            <h1>Explore Chicago Neighborhoods</h1>
                            <p>A fun app that let's you explore restaurants and sights throughout the Windy City </p>

                            <p>Content is king</p>
                        </div>
                        <div class="secondary-info">
                            <p>
                                <a class="btn btn-primary" href="#"><i class="fa fa-user-plus"></i>Join Our Newsletter</a>
                            </p>
                        </div>
                    </div>
                </section><!-- end sidebar -->

                <section class="col-lg-7 col-12 ml-auto main-content">

                    <div class="home-page-posts animated fadeIn ">
                        <router-view/>
                    </div><!-- Home page posts -->

                    <footer class="split-footer">
                        <a href="post.html">Michael Browne</a>
                        <i class="link-spacer"></i>
                        <a href="post.html">2019</a>
                    </footer>

                </section><!-- main content -->

            </div> <!--/row -->

        </main> <!-- /container -->
        <main class="container middle-container"> 
            
        </main>
  </div>
</template>

<style>

#button {
    color: red;
}

</style>
