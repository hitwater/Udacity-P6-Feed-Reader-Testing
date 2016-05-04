/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* The test that loops through allFeeds object and
         * ensures it has a URL defined and that the URL is not empty.
         */
        it('has a defined URL and the URL is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

         /* The test that loops through allFeeds object and
         * ensures it has a name defined and that the name is not empty.
         */
        it('has a defined name and the name is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    /* A new test suite named "The menu" */
    describe('The menu', function() {
        /* The test that ensures the menu element is
         * hidden by default.
         */
        it('should be hidden by default', function() {
            var body = $('body');
            var menuIcon = $('.menu-icon-link');
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
         /* The test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: the menu displays when
          * clicked and it hides when clicked again.
          */
        it('should change the visibility of the menu when the menu icon is clicked', function() {
            var body = $('body');
            var menuIcon = $('.menu-icon-link');
            //After the menu is clicked once, the menu should display.
            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(false);
            //After the menu is clicked a second time, the menue should hide.
            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });
    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* The test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        it('should have at least an .entry element in the .feed containter', function(done) {
            var container = $('.feed');
            var entries = container.find('.entry');
            var entriesLen = entries.length;
            expect(entriesLen >= 1).toBe(true);
            done();
        });
    });
    /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* The test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed() is asynchronous.
         */
        //Create variables that can be used through this test .
        var initialFeed;
        var newFeed;
        /* Obtain html contents of loadFeed[0] and loadFeed[1] and set each
         * respectively to initialFeed and newFeed.
         */
        beforeEach(function(done) {
            $('.feed').empty();
            loadFeed(0, function() {
                initialFeed = $('.feed').html();
                loadFeed(1, function() {
                    newFeed = $('.feed').html();
                    done();
                });
            });
        });
         /* Expect intitialFeed to not be newFeed contents.*/
        it('should change content when a new feed is loaded', function(done) {
            expect(initialFeed != newFeed).toBe(true);
            done();
        });
    });
}());
