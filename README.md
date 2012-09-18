<h1>Guide to using the HTML History API...<h1>
	<h2>...to hack the location bar for a seamless user experience without page reloads</h2>
	<h3>Overview</h3>
	<p>The HTML History API allows us to manipulate the history stack (in HTML5) through an interface provided by the history object. Well, what is so great about that? Let's take a look at how we can use this to our advantage and create a website that requires no page reloads while navigating through the site.</p><p>We all know how to use AJAX within our websites to send and retrieve data asynchronously to and from the server, in an effort to create truly dynamic web applications. But what if our entire experience took place without ever having to reload a page? One of the major drawbacks to this type of approach is that there is only one entry point, namely the index, which controls and modifies your content. How do you send a link to your friend? How do you bookmark a subpage for later viewing? We can do this by using the History API and actually changing the URL in the browser's location bar, as well as modifying the browser history stack, while loading our content via AJAX to create a very smooth user experience without reloading static elements (such as headers, footers, javascript, css, fonts, etc) every time you navigate to the next page. </p>
<p>One thing to note is that this is a very modern technique, so unless you're using the most updated versions of Chrome, Firefox or IE (10!), you may not see the expected browser behavior. No worries though - if you use this technique properly it will degrade gracefully in legacy browsers. These users will navigate the site as normal with pages simply reloading through navigation.</p>
<p>Let's first take a look at some examples so we can see exactly what we are talking about. A great example is USA Today's site, currently in beta: <a href="http://beta.usatoday.com/">http://beta.usatoday.com/</a> - take a few moments to navigate around. Notice how the content changes via a Javascript slider. Nothing too exciting, until you notice the location bar is changing as well. Try hitting the site from one of the subpage URLs, and you'll see the content load as if it were it's own page!</p>
	<h3>So what exactly is going on here?</h3>
	<p>In the most simple example, consider this scenario. We have an index page and a few subpages, who share both an included footer and header file. In each of these subpages, we can apply a little check before loading anything. For our example, let's check for a GET parameter, arbitrarily called 'ajax_request'. If we don't see it, serve the page as normal - header, content, footer, etc. But if it is detected we can change what gets spit out to only the main content, ignoring everything else. You could of course get much more in depth with these AJAX requests, but keep in mind this is the most general example. Now we can use a little javascript to attach a listener to our navigation links perhaps, to upon clicking load the content associated with that link's href by calling it via an AJAX request with our previously specified GET parameter.</p>
	<p>Nothing here is very revolutionary yet. But in our Javascript we can alter our location bar using the <a href="https://developer.mozilla.org/en-US/docs/DOM/Manipulating_the_browser_history#The_pushState().C2.A0method">push state method</a>, like so:</p>
<pre>var href = $(this).attr('href')
if(href != window.location){
  window.history.pushState({path: href},'',href)
}</pre>		
		<p>We have now successfully changed the location bar to reflect the current page we are on, without reloading the page!</p>
<h3>HTML History Plugin</h3>
I have created a simple jQuery plugin to achieve this functionality. Feel free to modify it to your own needs. You obviously have to set up the way the AJAX requests are handled on your backend yourself, but the plugin allows you to configure a content container and a GET parameter through the options. An example of its usage:
<pre>&lt;div id="nav">
&lt;a href="foo.php" class="nav">Link 1&lt;/a>
&lt;a href="bar.php" class="nav">Link 2&lt;/a>
&lt;/div>

&lt;div id="mainContainer">&lt;/div>

&lt;script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js">&lt;/script>
&lt;script src="js/html-history.js">&lt;/script>

&lt;script>
  $(document).ready(function(){
    $('#nav a').htmlHistory({
      content: 'mainContainer',
      getParam: 'html5_ajax_request'
    });
  });
&lt;/script></pre>
<p>Note: if you don't set the <strong>content</strong> or <strong>getParam</strong> they will default to "content" and "ajax_req" respectively.</p>