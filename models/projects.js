module.exports = function() {

	return {
		brewers: {
			title: "Brewer's Advertising Data",
			date: 'November 2013',
			intro: "Website for Brewer's Apps in South Africa.",
			description: [
				"<a title='brewers.co.za' target='_blank' href='http://brewers.co.za'>brewers.co.za</a> · <a href='https://github.com/adamcbrewer/brewers.co.za' title='Source code for brewers.co.za' target='_blank'>github</a>",
				"Originally launched mid-year 2010, Brewer's Advertising Data is a central exchange of advertising and marketing data within South Africa.",
				"This is the new website for the webapp which my brother <a href='http://studiobrewer.co.za' title='studiobrewer.com' target='_blank'>Jake</a> and I worked on together and are currently in the process of overhauling in terms of design, functionality, mobile usability and performance.",
				"The new direction of the Brewer's app shows a simplification of what the aims and features of the softwear are hoping to achieve, including a free initial trial on sign-up and having a more social presence with regards to changes and happenings within the industry.",
				"The source code can be found on <a href='https://github.com/adamcbrewer/brewers.co.za' title='Source code for brewers.co.za' target='_blank'>GitHub</a>."
			],
			images: [
				{
					url: "/projects/brewers/full.jpg",
					alt: "The large-scale version of the site website"
				},
				{
					url: "/projects/brewers/mobile.jpg",
					alt: "Responsive breakpoints - applied as needed and device agnostic"
				}
			]
		},
		googleprivacyweek: {
			title: "Google Privacy Week",
			date: "October/November 2013",
			intro: "Internal site for Google's Privacy Week 2013",
			description: [
				"Google Privacy Week was a project I worked on with <a href='http://toasterltd.com' title='toasterltd.com' target='_blank'>Toaster</a>, creating an internal site for Google personnel to browse and share their thoughts about what privacy means to them during Google's Privacy Week, 11 - 15 November 2013.",
				"Everything on the front end was done in modular components, such as the one to manage fetching the quotes, another to handle the fullscreen functionality (and triggering autoplay), the lightbox as well as the map page.",
				"The hopper module was the central handler for fetching quotes from the server and handled pagination. Google Closure's PubSub component was used to push quotes from the server to both the gallery page – for infinite scroll functionality – and to the lightbox carousel. Similarly to the infinite scroll functionality, the carousel module triggered the the hopper module to fetch quotes when reaching the last couple of slides, creating an looped gallery both through scrolling and watching the carousel play through.",
				"Building the quotes themselves was something I wasn't sure was possible with just CSS, and there were talks of using canvas. However, I was playing around with pseudo elements for quite a bit and came out with what looked pretty close to the design (you can see the resulting HTML output by viewing the page source). It made me happier knowing we could build them all in HTML & CSS, meaning the heavy logic of the quotes only had to be when the line should break, the size/character count ratio and the keyword matching (for this I used a simple regex pattern).",
				"The 'quote engine' module was built to take in a plain string and do all the calculations about the words per line, when the line should break, when to 'expose' a keyword, where to place the highlighting and the overall size of the quote (which depended on the total character count).",
				"For the carousel I decided to use CSS classes to give us more options to manipulate it, as we had no idea of how it was going to animate. Alberto – the project's tech lead – suggested the synced/rippled rotation of the lines and from there I just applied some CSS transitions, using :nth-child() selectors (for the staggered effect) – needless to say I was very happy with the results! We did have an issue with scaling the quotes while fullscreen was enabled, due to the CSS3 effect we were applying to them, so we had to change the animation slightly to avoid rasterizing the elements; scaling it up while still keeping it crisp.",
				"It's projects like these that make me love what I do!"
			],
			images: [
				{
					url: "/projects/google-privacy-week/lightbox.jpg",
					alt: "The opened lightbox on the gallery page"
				},
				{
					url: "/projects/google-privacy-week/animation.gif",
					alt: "Carousel animation"
				},
				{
					url: "/projects/google-privacy-week/gallery-small.jpg",
					alt: "Close-up on the gallery"
				},
				{
					url: "/projects/google-privacy-week/gallery-large.jpg",
					alt: "The gallery – extended"
				},
				{
					url: "/projects/google-privacy-week/map.jpg",
					alt: "Throughts around the world, grouped by Google office locations"
				},
				{
					url: "/projects/google-privacy-week/schedule-day.jpg",
					alt: "A single day event listing"
				},
				{
					url: "/projects/google-privacy-week/schedule-week.jpg",
					alt: "Event schedule for the week"
				},
				{
					url: "/projects/google-privacy-week/schedule-week-filtered.jpg",
					alt: "The weekly schedule, filtered by region"
				},
				{
					url: "/projects/google-privacy-week/submission-input.jpg",
					alt: "User input when sharing a thought on privacy"
				},
				{
					url: "/projects/google-privacy-week/submission-final.jpg",
					alt: "Highlight colour and other options before submission"
				}
			]
		},
		gatherly: {
			title: "Gather.ly",
			date: "September 2013",
			website: "gather.ly",
			intro: "Create, or find, interest-based communities. Part of The Interest Network.",
			description: [
				'<a title="gather.ly" href="http://gather.ly" target="_blank">gather.ly</a>',
				"Gather.ly – or Iam150/ previously – was the first client I had the privilage of working with soon after deciding to go freelance. Andy, Nick, Sophie and Gavin were some of the nicest people I've had the good fortune of working with.",
				"I was hired to oversee the responsibility of the front-end side of things, which involved addressing performance, responsiveness and overall design improvements, across both dektop and mobile/touch devices – all in aid of their big out-of-beta launch.",
				"Most of the features I worked on and helped implement – such as user @mentioning, embedded content previews, Mandrill & MailChimp integration, likes and new post notifications – we're already structurally built server-side, but needed new Javascript modules to be written to help pull though their content and handle their respective actions.",
				"I also decided a modern front-end workflow would be essential to manage compiling, building and deploying between different environments; local, development and production. For this Grunt.js was my choice, along with Sass to modularise the CSS development. The application runs off Node.js, MongoDB (Mongoose), express.js and uses additional technologies such as Mandrill & MailChimp APIs, Handlebars, Embed.ly, as well as Facebook and Twitter oAuth Node libraries.",
				"In my eyes, it's a unique take on the concept of sharing within interest-driven groups – definitely <a target='_blank' href='http://gather.ly' title='gather.ly'>worth checking out</a>, even on your mobile ;)"
			],
			images: [
				{
					url: "/projects/gatherly/my-feed.jpg",
					alt: "The My Feed page"
				},
				{
					url: "/projects/gatherly/discover.jpg",
					alt: "The Dicover page, showing groups still recruiting members"
				},
				{
					url: "/projects/gatherly/content-preview.jpg",
					alt: "Preview of remote content to be shared, using embeddly's API"
				},
				{
					url: "/projects/gatherly/likes.jpg",
					alt: "A popup modal displaying the number of likes for a post"
				},
				{
					url: "/projects/gatherly/members.jpg",
					alt: "The members page"
				},
				{
					url: "/projects/gatherly/mentioning.jpg",
					alt: "The @mentioning widget, showing autocompeted suggestions of members within a group."
				}
			]
		},
		lovecravendale: {
			title: "Love Cravendale",
			date: "June 2013",
			website: "lovecravendale.co.uk",
			intro: "Loyalty scheme web app",
			description: [
				'<a title="lovecravendale.co.uk" href="http://lovecravendale.co.uk" target="_blank">lovecravendale.co.uk</a>',
				'I had a great time working alongside <a href="http://lovecravendale.co.uk/humans.txt" title="humans" target="_blank">several developers</a> for this project while enjoying my time working for Saatchi &amp; Saatchi in London.',
				'The site is a loyalty scheme encouraging users to collect codes printed on bottle labels purchased in-store and exchanged for various prizes and promotions on the site. The value of the prizes increases the number of codes required to redeem it.',
				'I had the privilege of building the code redemption part of the site, working closely with the back-end developer and the UX designer to create an easy to use and interesting process for users to collect codes and redeem them for prizes.',
				'My favourite part was playing around with loads of little subtle animations and transitions, all through the use of CSS and controlling those animation states with Javascript when required.'
			],
			images: [
				{
					url: "/projects/lovecravendale/themagic-01.jpg",
					alt: "A successfully entered code"
				},
				{
					url: "/projects/lovecravendale/themagic-02.jpg",
					alt: "The Magic begins"
				},
				{
					url: "/projects/lovecravendale/themagic-03.jpg",
					alt: "Total heart count shown to user"
				}
			]
		},
		studiobrewer: {
			title: "Studio Brewer",
			date: "February 2013",
			website: "studiobrewer.com",
			intro: "The creative practice of Jake Brewer; Designer, Art Director and Illustrator",
			description: [
				'<a target="_blank" title="studiobrewer.com" href="http://studiobrewer.com">studiobrewer.com</a> · <a href="http://github.com/adamcbrewer/studiobrewer.com" target="_blank" title="studiobrewer.com on gihub">github</a>',
				"Studio Brewer is the creative practive of my older brother, Jake Brewer.",
				"We're fortunate enough to have complimentary skills; we're often working on projects together or trading services with one another.",
				"Following my brother's designs, I wanted to focus on something that would show speed, responsiveness and soft transitions between views. Jake's a designer &mdash; meaning we're talking designer quality images here &mdash; so I decided to reduce the amount of inital asset requests (to improve overall speed) and conditionally load them for selected projects. This method meant that the core application needed quite a bit of asynchronous thinking.",
				"Because of the planning involved between the two of us &mdash; regarding performance and the number of requests &mdash; the site was a natural fit to make responsive and device agnostic; great attention to detail was paid to mobile usability. The perceived speed is amazing, in terms of both load times and interface feedback, on any device."
			],
			images: [
				{
					url: "/projects/studiobrewer/responsive.jpg",
					alt: "Responsive views"
				},
				{
					url: "/projects/studiobrewer/intro.jpg",
					alt: "Intro page"
				},
				{
					url: "/projects/studiobrewer/projects_grid.jpg",
					alt: "Projects view – grid"
				},
				{
					url: "/projects/studiobrewer/projects_list.jpg",
					alt: "Projects view – list"
				},
				{
					url: "/projects/studiobrewer/project_detail.jpg",
					alt: "Detailed project view"
				}
			]
		},
		toyotapositive: {
			title: "Toyota Positive",
			date: "January 2013",
			website: "toyotapositive.com",
			intro: "Inspiring uplifting gestures and selfless acts",
			description: [
				'<a href="http://toyotapositive.com" title="toyotapositive.com" target="_blank">toyotapositive.com</a>',
				'Toyota Positive was a site built to promote the positive influence their new car was bringing to the environment.',
				'It was a site to showcase the individual stories from people who used the car to perform positive deeds &mdash; and was fun to make. It was built to stand as both a web app and as an embedded YouTube gadget. The video player/carousel widget was the core feature of the site and the trickiest to implement. The video playlist in the main widget can be controlled through the images in the gallery, with each story able to be individually	shared on both Twitter and Facebook as it cycles through.',
				'It was the first time I\'d gotten my hands dirty with an iterative design/build process, not to mention integrating language support for multiple countries as well.'
			],
			images: [
				{
					url: "/projects/toyota-positive/home01.jpg",
					alt: "Homepage"
				},
				{
					url: "/projects/toyota-positive/home02.jpg",
					alt: "Homepage – video playing"
				},
				{
					url: "/projects/toyota-positive/stories.jpg",
					alt: "The Positive stories page"
				},
				{
					url: "/projects/toyota-positive/video.jpg",
					alt: "The video page"
				},
				{
					url: "/projects/toyota-positive/form.jpg",
					alt: "The form for users to sumbit their own stories"
				}
			]
		},
		cravendaleepicstraws: {
			title: "Cravendale Epic Straws",
			date: "October 2012",
			website: "epicstraws.co.uk",
			intro: "Loyalty app/scheme",
			description: [
				'<a href="http://epicstraws.co.uk" title="epicstraws.co.uk" target="_blank">epicstraws.co.uk</a>',
				'This site was vastly different to anything I had made before while working at Outside Line. The size of the assets, the traffic generated and the experience we tried to deliver was a massive challange. I was excited from day one!',
				'The site was very image heavy and the designer\'s intention was to deliver a skeuomorphic experience following the brand\'s guidelines for the promotional straw sets that Cravendale were offering in exchange for collecting codes, which were printed and sold on bottles across the UK.',
				'Both the designer and I came up with an idea to simulate a 3-dimentional display of the straw sets using a series of images of each set, themselves modelled and rendered in 3D. The result was a combination of simple, 2D image replacement which gave an impressive, realistic 3D effect.',
				'Everything had to be built to give a complete experience, meaning even the YouTube player UI had to be built from scratch. In our workflow we ran our images through PunyPNG image compression and used CodeKit to minify and compress all our Javascript and CSS, all of which was served through an Amazon S3 CDN.',
				'It was the biggest site, with regards to traffic, that I had the pleasure in working on, not to mention celebratory drinks afterwards.'
			],
			images: [
				{
					url: "/projects/cravendale-epic-straws/homepage.jpg",
					alt: "Home page"
				},
				{
					url: "/projects/cravendale-epic-straws/products.jpg",
					alt: "Products page displaying the faux 3D spinning disc"
				},
				{
					url: "/projects/cravendale-epic-straws/redemption.jpg",
					alt: "A successfully redeemed code on the redemption page"
				},
				{
					url: "/projects/cravendale-epic-straws/redemption2.jpg",
					alt: "Collection form after entering 10 valid bottle codes"
				},
				{
					url: "/projects/cravendale-epic-straws/faq.jpg",
					alt: "FAQ page"
				}
			]
		},
		virgingalactic: {
			title: "Virgin Galactic",
			date: "November 2012",
			website: "virgingalactic.com/mobile",
			intro: "Mobile website",
			description: [
				'<a href="http://virgingalactic.com/mobile" target="_blank" title="virgingalactic.com/mobile">virgingalactic.com/mobile</a>',
				'Virgin Galactic is running a campaign in order to sell relatively affordable tickets for a seat for a ride into space. Having a very comprehensive site already, I was tasked with building a site to reach their mobile customers.',
				'A standalone mobile site was agreed upon, as well as a modest amount of parallax elements to accompany the flight information and registration form.',
				'In order to achieve the parallax effect and still maniplulate elements on the page, the native touch-scroll was removed and replaced with a third party library to simulate it. Having said that, navigating form elements while native functionality has been replaced is a nightmare, not to mention encountering several edge case issues.',
				'While I wouldn\'t personally agree with a standalone site, or parallax features for touch devices, the build was fun and I learnt a hell of a lot concerning mobile interaction and caveats.'
			],
			images: [
				{
					url: "/projects/virgin-galactic/ipad_2x_01.jpg",
					alt: "iPad - Intro and Experience"
				},
				{
					url: "/projects/virgin-galactic/ipad_2x_02.jpg",
					alt: "iPad - Book and the SpacePort"
				},
				{
					url: "/projects/virgin-galactic/mobile_2x_01.jpg",
					alt: "Mobile - Intro and Experience"
				},
				{
					url: "/projects/virgin-galactic/mobile_2x_02.jpg",
					alt: "Mobile - News and Space Ship Two"
				},
				{
					url: "/projects/virgin-galactic/mobile_2x_03.jpg",
					alt: "Mobile - Booking form"
				}
			]
		},
		jenniferhulley: {
			title: "Jennifer Hulley Photography",
			date: "June 2012",
			website: "jenniferhulley.com",
			intro: "Portfolio of a photographer",
			description: [
				'<a href="http://jenniferhulley.com" target="_blank" title="jenniferhulley.com">jenniferhulley.com</a>',
				'This site was built for wedding and events photographer, Jennifer Hulley to showcase her portfolio.',
				'I worked alongside my <a href="http://studiobrewer.com" target="_blank">brother</a> to create a very smooth and transitioned expereince for browsing through the categories of photographs.',
				'The site has since been redesigned and converted to a new SquareSpace them, but it was built pixel perfect to these designs, conforming to my brother\'s high standard of design.'
			],
			images: [
				{
					url: "/projects/jenniferhulley/welcome.jpg",
					alt: "The welcome page"
				},
				{
					url: "/projects/jenniferhulley/section_view.jpg",
					alt: "Viewing shots within a category"
				},
				{
					url: "/projects/jenniferhulley/rollover.jpg",
					alt: "Thumbnail rollover (hover) effect"
				},
				{
					url: "/projects/jenniferhulley/lightbox.jpg",
					alt: "Browsing through high resolution shots"
				},
				{
					url: "/projects/jenniferhulley/about.jpg",
					alt: "The About page depicting hover states"
				}
			]
		},
		brewersdroop: {
			title: "Brewers Droop",
			date: "August 2011",
			website: "brewersdroop.co.za",
			intro: "Resposive Blog",
			description: [
				'<a href="http://brewersdroop.co.za" target="_blank" title="brewersdroop.co.za">brewersdroop.co.za</a>',
				'The Brewers Droop is a blog of tales and quips of Chris Brewer whose origins started as a monthly letter sent out to subscribers by mail.',
				'I built the site for my Dad to stop him pestering me for a blog. It was purely coincidental that at the time I wanted to learn how to use WordPress properly and also experiment with building a responsive site. I also seemed to be going through a MooTools phase at the time.',
				'<a target="_blank" title="Studio Brewer" href="http://studiobrewer.com">My older brother</a> designed the site and we launched it over many pints of Guinness and several bottles of wine.'
			],
			images: [
				{
					url: "/projects/brewersdroop/devices.jpg",
					alt: "Resposive overview from a selection of devices"
				},
				{
					url: "/projects/brewersdroop/home.jpg",
					alt: "Home page"
				},
				{
					url: "/projects/brewersdroop/singledroop.jpg",
					alt: "Single post page"
				},
				{
					url: "/projects/brewersdroop/about.jpg",
					alt: "About page"
				}
			]
		}
	};

};
