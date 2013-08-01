module.exports = function() {

	return {
		lovecravendale: {
			title: "Love Cravendale",
			date: "June 2013",
			website: "lovecravendale.co.uk",
			intro: "Loyalty scheme web app",
			description: [
				'I had a great time working alongside <a href="http://lovecravendale.co.uk/humans.txt" title="humans" target="_blank">several developers</a> for this project while enjoying my time working for Saatchi &amp; Saatchi in London.',
				'The site is a loyalty scheme encouraging users to collect codes printed on bottle labels purchased in-store and exchanged for various prizes and promotions on the site. The value of the prizes increases the number of codes required to redeem it.',
				'I had the privilege of building the code redemption part of the site, working closely with the back-end developer and the UX designer to create an easy to use and interesting process for users to collect codes and redeem them for prizes.',
				'My favourite part was playing around with loads of little subtle animations and transitions, all through the use of CSS and controlling those animation states with Javascript when required.'
			],
			images: [
				{
					url: "/projects/lovecravendale/themagic-01.jpg",
					alt: "The Magic - step 1"
				},
				{
					url: "/projects/lovecravendale/themagic-02.jpg",
					alt: "The Magic - step 1"
				},
				{
					url: "/projects/lovecravendale/themagic-03.jpg",
					alt: "The Magic - step 1"
				}
			]
		},
		studiobrewer: {
			title: "Studio Brewer",
			date: "February 2013",
			website: "studiobrewer.com",
			intro: "The creative practice of Jake Brewer; Designer, Art Director and Illustrator",
			description: [
				"<a target='_blank' title='studiobrewer.com' href='http://studiobrewer.com'>Studio Brewer</a> is the creative practive of my older brother, Jake Brewer.",
				"We're fortunate enough to have complimentary skills; we're often working on projects together or trading services with one another.",
				"Following my brother's designs, I wanted to focus on something that would show speed, responsiveness and soft transitions between views. Jake's a designer &mdash; meaning we're talking designer quality images here &mdash; so I decided to reduce the amount of inital asset requests (to improve overall speed) and conditionally load them for selected projects. This method meant that the core application needed quite a bit of asynchronous thinking.",
				"Because of the planning involved between the two of us &mdash; regarding performance and the number of requests &mdash; the site was a natural fit to make responsive and device agnostic; great attention to detail was paid to mobile usability. The perceived speed is amazing, in terms of both load times and interface feedback, on any device.",
				"The code for the site <a title='source code' target='_blank' href='http://github.com/adamcbrewer/studiobrewer.com'>can be found on github</a>."
			],
			images: [
				{
					url: "/projects/studiobrewer/intro.jpg",
					alt: "Intro page"
				},
				{
					url: "/projects/studiobrewer/projects_grid.jpg",
					alt: "Projects view: grid"
				},
				{
					url: "/projects/studiobrewer/projects_list.jpg",
					alt: "Projects view: list"
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
					alt: "Homepage, video playing"
				},
				{
					url: "/projects/toyota-positive/stories.jpg",
					alt: "The Positive stories"
				},
				{
					url: "/projects/toyota-positive/video.jpg",
					alt: "The video page"
				},
				{
					url: "/projects/toyota-positive/form.jpg",
					alt: "The form"
				}
			]
		},
		cravendaleepicstraws: {
			title: "Cravendale Epic Straws",
			date: "October 2012",
			website: "epicstraws.co.uk",
			intro: "Loyalty app/scheme",
			description: [
				'This site was vastly different to anything I had made before while working at Outside Line. The size of the assets, the traffic generated and the experience we tried to deliver was a massive challange. I was excited from day one!',
				'The site was very image heavy and the designer\'s intention was to deliver a skeuomorphic experience following the brand\'s guidelines for the promotional straw sets that Cravendale were offering in exchange for collecting codes, which were printed and sold on bottles across the UK.',
				'Both the designer and I came up with an idea to simulate a 3-dimentional display of the straw sets using a series of images of each set, themselves modelled and rendered in 3D. The result was a combination of simple, 2D image replacement which gave an impressive, realistic 3D effect.',
				'Everything had to be built to give a complete experience, meaning even the YouTube player UI had to be built from scratch. In our workflow we ran our images through PunyPNG image compression and used CodeKit to minify and compress all our Javascript and CSS, all of which was served through an Amazon S3 CDN.',
				'It was the biggest site, with regards to traffic, that I had the pleasure in working on, not to mention celebratory drinks afterwards.'
			],
			images: [
				{
					url: "/projects/cravendale-epic-straws/homepage.jpg",
					alt: "Homepage"
				},
				{
					url: "/projects/cravendale-epic-straws/products.jpg",
					alt: "Products"
				},
				{
					url: "/projects/cravendale-epic-straws/redemption.jpg",
					alt: "Redemption"
				},
				{
					url: "/projects/cravendale-epic-straws/redemption2.jpg",
					alt: "Redemption page deux"
				},
				{
					url: "/projects/cravendale-epic-straws/faq.jpg",
					alt: "FAQ"
				}
			]
		},
		virgingalactic: {
			title: "Virgin Galactic",
			date: "November 2012",
			website: "virgingalactic.com/mobile",
			intro: "Mobile website",
			description: [
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
					alt: "Mobile - Booking"
				}
			]
		},
		brewersdroop: {
			title: "Brewers Droop",
			date: "August 2011",
			website: "brewersdroop.co.za",
			intro: "Resposive Blog",
			description: [
				'The Brewers Droop is a blog of tales and quips of Chris Brewer whose origins started as a monthly letter sent out to subscribers by mail.',
				'I built the site for my Dad to stop him pestering me for a blog. It was purely coincidental that at the time I wanted to learn how to use WordPress properly and also experiment with building a responsive site. I also seemed to be going through a MooTools phase at the time.',
				'<a target="_blank" title="Studio Brewer" href="http://studiobrewer.com">My older brother</a> designed the site and we launched it over many pints of Guinness and several bottles of wine.'
			],
			images: [
				{
					url: "/projects/brewersdroop/devices.jpg",
					alt: "Devices"
				},
				{
					url: "/projects/brewersdroop/home.jpg",
					alt: "Homepage"
				},
				{
					url: "/projects/brewersdroop/singledroop.jpg",
					alt: "Single post"
				},
				{
					url: "/projects/brewersdroop/about.jpg",
					alt: "About"
				}
			]
		}
	};

};
