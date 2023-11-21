import { test, expect } from "@playwright/test";

const html = `<section>
	<svg xmlns="http://www.w3.org/2000/svg" style="width: 0;height: 0;" version="1.1">
		<defs>
			<filter id="blood-drop">
				<feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
				<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="blood-drop" />
				<feBlend in="SourceGraphic" in2="blood-drop" />
			</filter>
		</defs>
	</svg>
	<svg style="width: 0;height: 0;" xmlns="http://www.w3.org/2000/svg" version="1.1">
		<filter id="blur">
			<fegaussianblur stddeviation="10"></fegaussianblur>
		</filter>
	</svg>

	<main>
		<header id="header">
			<div class="nav-section"><a id="mag" href="#" class="nav"><i class="fa-solid fa-magnifying-glass"></i></a> </div>
			<nav class="nav-bar">
				<a href="#about" class="nav">About</a>
				<a href="#" class="nav" id="home"><i class="fa-solid fa-house-chimney"></i></a>
				<a onclick="topFunction()" id="topBtn" class="nav" title="Go to top"><i class="fa-solid fa-arrow-up fa-bounce"></i></a>
				<a href="#shop" class="nav">Shop</a>
			</nav>
			<div class="nav-section"> <a href="#" class="nav"><i class="fa-solid fa-gear fa-spin-pulse"></i><a>

			</div>
		</header>
		<section id="about">
			<div class="hero">
				<h1 id="about-header">About</h1>

			</div>

			<div>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc congue tellus feugiat, luctus metus sed, tincidunt dui. Aenean id sapien dui. Duis id tortor in risus eleifend euismod. Sed ut erat mauris. Integer pretium, velit vitae egestas cursus, risus risus ornare nunc, eu feugiat tellus elit vel nunc. Fusce turpis erat, sollicitudin in fringilla sit amet, mattis eu ipsum. In euismod leo a neque varius pulvinar. Nulla ut tristique nisi. Nam eu enim sit amet sapien iaculis aliquet. Nunc pharetra lacinia nunc non dignissim. Suspendisse quis hendrerit mauris. Fusce sodales ac tellus eget finibus. Phasellus semper sollicitudin lectus, nec facilisis mauris congue in. Suspendisse ut augue massa. Sed nec velit ac ante euismod porta ut eu orci. Nulla facilisi.</p>

				<p>Integer aliquet eget ipsum vitae scelerisque. <b>Phasellus sodales euismod convallis.</b> Mauris quis ipsum eget risus dignissim dapibus at vitae odio. Nulla facilisi. Fusce auctor tortor pulvinar, vestibulum eros a, cursus ante. Sed porta tristique est ac iaculis. Quisque posuere purus in ultrices semper.</p>
				<figure><img width="200px" height="200px" src="https://images.unsplash.com/photo-1494486205133-727224a9f727?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQ1MjA3OTV8&ixlib=rb-4.0.3&q=85" />
					<figcaption>Purple Makes me Cry. Long ago, purple was only for the rich.</figcaption>
				</figure>
				<p>
					Sed id interdum arcu. Fusce nec est commodo, congue ipsum in, tempor lorem. Ut sapien nunc, imperdiet eu porta in, vulputate at est. Mauris pharetra, ex id vulputate tincidunt, odio dui pulvinar lacus, at fermentum sem diam a enim. Nunc dapibus metus vitae purus facilisis, eget malesuada mi auctor. Etiam elit sapien, accumsan id dictum at, facilisis ut justo. Aenean tellus sapien, fringilla in semper sed, ullamcorper et metus. Nulla egestas in sapien sed auctor. Donec dapibus augue a venenatis aliquam. Quisque condimentum volutpat turpis, non consectetur lacus mattis quis. Mauris sit amet augue ut erat dapibus semper. Quisque non velit ex. Fusce ultrices enim arcu, luctus feugiat dui pulvinar ac.</p>

				<p>Proin eu mi a leo vestibulum iaculis eleifend vel ipsum. Sed pellentesque ullamcorper eros at faucibus. Morbi tempor rutrum lorem, in ornare enim. <s>Proin ut egestas odio.</s> Quisque et ligula consequat, tempor risus eget, iaculis felis. Mauris vitae cursus massa. Vestibulum lacus arcu, interdum in lacinia et, euismod eu risus. Nunc sit amet lorem vehicula lectus vulputate tempor. Pellentesque pretium nisl vitae congue tristique. Curabitur elit nibh, imperdiet ac finibus non, condimentum nec eros.</p>

				<p>Donec eu lorem eros. Phasellus elementum a ipsum sed eleifend. Maecenas tempor pretium ante a dictum. Fusce euismod lacus in metus auctor, vitae ullamcorper erat aliquet. Phasellus at felis in ante posuere consequat a a lorem. Sed convallis tempor volutpat. In suscipit nibh id dolor dapibus consectetur. <i>In hac habitasse platea dictumst.</i> Quisque ullamcorper mi diam, ut cursus ex rhoncus et. Morbi ipsum enim, viverra nec justo eu, vestibulum tincidunt orci. Praesent ullamcorper diam nec sodales dignissim. Integer id leo sit amet diam accumsan porta. Aenean vel tincidunt ante. Suspendisse faucibus viverra lectus, in gravida ante tristique nec.</p>

				<q>
					Flower of this purple dye,<wbr /> Hit with Cupid's archery,<wbr /> Sink in the apple of his eye.
				</q>

				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc congue tellus feugiat, luctus metus sed, tincidunt dui. Aenean id sapien dui. Duis id tortor in risus eleifend euismod. Sed ut erat mauris. Integer pretium, velit vitae egestas cursus, risus risus ornare nunc, eu feugiat tellus elit vel nunc. Fusce turpis erat, sollicitudin in fringilla sit amet, mattis eu ipsum. In euismod leo a neque varius pulvinar. Nulla ut tristique nisi. Nam eu enim sit amet sapien iaculis aliquet. Nunc pharetra lacinia nunc non dignissim. Suspendisse quis hendrerit mauris. Fusce sodales ac tellus eget finibus. Phasellus semper sollicitudin lectus, nec facilisis mauris congue in. Suspendisse ut augue massa. Sed nec velit ac ante euismod porta ut eu orci. Nulla facilisi.</p>

				<p>Integer aliquet eget ipsum vitae scelerisque. <b>Phasellus sodales euismod convallis.</b> Mauris quis ipsum eget risus dignissim dapibus at vitae odio. Nulla facilisi. Fusce auctor tortor pulvinar, vestibulum eros a, cursus ante. Sed porta tristique est ac iaculis. Quisque posuere purus in ultrices semper.</p>

				<p>
					Sed id interdum arcu. Fusce nec est commodo, congue ipsum in, tempor lorem. Ut sapien nunc, imperdiet eu porta in, vulputate at est. Mauris pharetra, ex id vulputate tincidunt, odio dui pulvinar lacus, at fermentum sem diam a enim. Nunc dapibus metus vitae purus facilisis, eget malesuada mi auctor.</p>

				<figure><img width="200px" height="200px" src="https://images.unsplash.com/photo-1494444770832-e2ec7310d339?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTQ1MjA3OTV8&ixlib=rb-4.0.3&q=85" />
					<figcaption>Happiness held is the seed; Happiness shared is the flower.</figcaption>
				</figure>

				<p>

					Etiam elit sapien, accumsan id dictum at, facilisis ut justo. Aenean tellus sapien, fringilla in semper sed, ullamcorper et metus. Nulla egestas in sapien sed auctor. Donec dapibus augue a venenatis aliquam. Quisque condimentum volutpat turpis, non consectetur lacus mattis quis. Mauris sit amet augue ut erat dapibus semper. Quisque non velit ex. Fusce ultrices enim arcu, luctus feugiat dui pulvinar ac.</p>

				<p>Proin eu mi a leo vestibulum iaculis eleifend vel ipsum. Sed pellentesque ullamcorper eros at faucibus. Morbi tempor rutrum lorem, in ornare enim. <s>Proin ut egestas odio.</s> Quisque et ligula consequat, tempor risus eget, iaculis felis. Mauris vitae cursus massa. Vestibulum lacus arcu, interdum in lacinia et, euismod eu risus. Nunc sit amet lorem vehicula lectus vulputate tempor. Pellentesque pretium nisl vitae congue tristique. Curabitur elit nibh, imperdiet ac finibus non, condimentum nec eros.</p>

				<p>Donec eu lorem eros. Phasellus elementum a ipsum sed eleifend. Maecenas tempor pretium ante a dictum. Fusce euismod lacus in metus auctor, vitae ullamcorper erat aliquet. Phasellus at felis in ante posuere consequat a a lorem. Sed convallis tempor volutpat. In suscipit nibh id dolor dapibus consectetur. <i>In hac habitasse platea dictumst.</i> Quisque ullamcorper mi diam, ut cursus ex rhoncus et. Morbi ipsum enim, viverra nec justo eu, vestibulum tincidunt orci. Praesent ullamcorper diam nec sodales dignissim. Integer id leo sit amet diam accumsan porta. Aenean vel tincidunt ante. Suspendisse faucibus viverra lectus, in gravida ante tristique nec.</p>

			</div>
		</section>
	</main>`;
const js = `let button = document.getElementById("topBtn");
let home = document.getElementById("home");
let nav = document.getElementById("header");

const scrollDetect = () => {
	var lastScroll = 0;

	window.onscroll = () => {
		let currentScroll =
			document.documentElement.scrollTop || document.body.scrollTop;

		if (currentScroll > 0 && lastScroll <= currentScroll) {
			lastScroll = currentScroll;
			// console.log("bottom");
			button.style.display = "none";
			home.style.display = "block";
		} else {
			lastScroll = currentScroll;
			// console.log("top");
			if (
				document.body.scrollTop > 500 ||
				document.documentElement.scrollTop > 500
			) {
				button.style.display = "block";
				home.style.display = "none";
			} else {
				button.style.display = "none";
				home.style.display = "block";
			}
		}
	};
};

const topFunction = () => {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

// const headerSet = () => {
// 	if (
// 		document.body.scrollTop > 1000 ||
// 		document.documentElement.scrollTop > 1000
// 	)
// 		position: sticky;
// 		nav.style.bottom = "80vh";
// 	} else {
// 		nav.style.bottom = "10vh";
// 	}
// };

scrollDetect();
`;
const css = `body {
	margin: 0;
	padding: 0;
	min-height: 100vh;
	background-color: #dfdbe5;
	font-family: "Inter", sans-serif;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.25'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

header {
	position: sticky;
	top: 40px;
	margin: auto;
	display: flex;
	justify-content: center;
	align-items: center;

	z-index: 9;
	border-radius: 50px;
	backdrop-filter: blur(25px);
	background-color: rgb(250 250 250 / 0.35);
	border: 1px solid #ffffff;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
		rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

	@media (max-width: 768px) {
		width: 70vw;
		font-size: 0.8rem;
	}

	@media (min-width: 768px) {
		width: 50vw;
	}
}

main {
	margin-bottom: 15vh;
}

section {
	min-height: 100vh;
}

ol {
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	padding: 1rem;
	list-style: none;
}

.nav-bar {
	width: 45vw;
	border-radius: 35px;
	background-color: rebeccapurple;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
		rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
	background: rgb(52, 162, 255);
	background: radial-gradient(
		circle,
		rgba(218, 0, 255, 1) 0%,
		rgba(102, 51, 153, 1) 100%
	);
}

.nav {
	text-decoration: none;
	flex: 1;
	padding: 15px 20px;
	color: #fff;
	text-align: center;
	font-weight: 500;

	&:hover {
		background-color: white;
		color: rebeccapurple;
		border-radius: 50px;
		scale: 1.2;
	}
}

.nav-section {
	// background-color: rgb(255 255 255 / 0.05);

	padding: 20px 0;
	z-index: -1;
}

.nav-section .nav {
	color: rebeccapurple;

	&:hover {
		background-color: transparent;
		color: #fff;
	}
}

.hero {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: auto;
}

h1 {
	font-size: 5rem;
	font-weight: 200;
	letter-spacing: -0.05em;
	line-height: 1;
	color: rebeccapurple;
	text-align: center;
}

p,
q {
	max-width: 45rem;
	margin: 1rem auto;
	padding: 0 1rem;
	line-height: 1.6;
	text-align: justify;
	shape-outside: circle(50%);
}

q {
	display: block;
	font-size: 2rem;
	font-style: italic;
	text-align: center;
	color: purple;
	text-indent: 2rem hanging each-line;
}

figure {
	width: 200px;
	float: left;
	margin: 0.5rem 150px;

	&:nth-of-type(2) {
		float: right;
	}

	& img {
		border-radius: 50%;
	}

	& figcaption {
		color: rebeccapurple;
		font-style: italic;
		text-align: center;
	}
}

/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
	scrollbar-width: thin;
	scrollbar-color: #8f54a0 #ffffff;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
	width: 5px;
}

*::-webkit-scrollbar-track {
	background: #dfdbe5;
}

*::-webkit-scrollbar-thumb {
	background-color: rebeccapurple;
	border-radius: 5px;
}

#topBtn {
	display: none;

	&:hover {
		background-color: white;
		color: rebeccapurple;
		scale: 1.8;
		cursor: pointer;
	}
}
`;

test("Theme color change", async ({ page }) => {
  // Write your test code here
  await page.goto("http://localhost:5173/sandbox");
  const ColorChange = await page.locator(
    "#root > div > div:nth-child(1) > header > div > div.MuiBox-root.css-0 > button > div > span"
  );
  await page.getByRole("button", { name: "Dark" }).click();
  expect(ColorChange).toHaveText("Light");
  await page.getByRole("button", { name: "Light" }).click();
  expect(ColorChange).toHaveText("Dark");
});


test("Label test SandBox", async ({ page }) => {
  // Write your test code here
  await page.goto("http://localhost:5173/sandbox");
  const title = await page.title();
  expect(title).toBe("Evaluation Module");

  const htmllable = await page.locator(
    "#back-to-top-anchor > div.MuiGrid-root.MuiGrid-container.css-9obus6-MuiGrid-root > div.MuiGrid-root.MuiGrid-container.css-vogmxi-MuiGrid-root > div:nth-child(1) > div > p"
  );
  const csslable = await page.locator(
    "#back-to-top-anchor > div.MuiGrid-root.MuiGrid-container.css-9obus6-MuiGrid-root > div.MuiGrid-root.MuiGrid-container.css-vogmxi-MuiGrid-root > div:nth-child(2) > div > p"
  );
  const jslable = await page.locator(
    "#back-to-top-anchor > div.MuiGrid-root.MuiGrid-container.css-9obus6-MuiGrid-root > div.MuiGrid-root.MuiGrid-container.css-vogmxi-MuiGrid-root > div:nth-child(3) > div > p"
  );
  expect(htmllable).toHaveText("HTMLShow");
  expect(csslable).toHaveText("CSSShow");
  expect(jslable).toHaveText("JSShow");
  
});



test("Functional test SandBox", async ({ page }) => {
  // Write your test code here
  await page.goto("http://localhost:5173/sandbox");
  const title = await page.title();
  expect(title).toBe("Evaluation Module");

  const htmllable = await page.locator(
    "#back-to-top-anchor > div.MuiGrid-root.MuiGrid-container.css-9obus6-MuiGrid-root > div.MuiGrid-root.MuiGrid-container.css-vogmxi-MuiGrid-root > div:nth-child(1) > div > p"
  );
  expect(htmllable).toHaveText("HTMLShow");
  await page.getByText("HTMLShow").click();
  await page
    .locator("p")
    .filter({ hasText: "HTMLShow" })
    .getByLabel("Show")
    .uncheck();
  await page
    .locator("p")
    .filter({ hasText: "HTMLShow" })
    .getByLabel("Show")
    .check();
  await page.getByText("CSSShow").click();
  await page
    .locator("p")
    .filter({ hasText: "CSSShow" })
    .getByLabel("Show")
    .uncheck();
  await page
    .locator("p")
    .filter({ hasText: "CSSShow" })
    .getByLabel("Show")
    .check();
  await page.getByText("JSShow").click();
  await page
    .locator("p")
    .filter({ hasText: "JSShow" })
    .getByLabel("Show")
    .uncheck();
  await page
    .locator("p")
    .filter({ hasText: "JSShow" })
    .getByLabel("Show")
    .check();

  await page.locator(".view-line").first().click();
  await page.getByLabel("Editor content;Press Alt+F1").first().fill(html);
  await page
    .locator(
      "div:nth-child(2) > .editor-container > .MuiBox-root > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > div > section > .editorCode-wrapper > .monaco-editor > .overflow-guard > .monaco-scrollable-element > .lines-content > .view-lines > .view-line"
    )
    .click();
  await page.getByLabel("Editor content;Press Alt+F1").nth(1).fill(css);
  await page
    .locator(
      "div:nth-child(3) > .editor-container > .MuiBox-root > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > div > section > .editorCode-wrapper > .monaco-editor > .overflow-guard > .monaco-scrollable-element > .lines-content > .view-lines > .view-line"
    )
    .click();
  await page
    .locator("section")
    .filter({ hasText: /^1$/ })
    .getByLabel("Editor content;Press Alt+F1")
    .fill(js);
  await page.getByRole("button", { name: "Settings" }).click();
  await page.getByLabel("meta tag").click();
  await page
    .getByLabel("meta tag")
    .fill(
      `<meta name="viewport" content="width=device-width, initial-scale=1">`
    );
  await page.getByRole("tab", { name: "CSS" }).click();
  await page.getByLabel("cdn css link").click();
  await page
    .getByLabel("cdn css link")
    .fill(
      `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css`
    );
  await page.getByRole("button", { name: "Submit" }).click();
  
  await page.frameLocator('#myIframe').locator('header').filter({ hasText: 'About Shop' }).click();
  await page.frameLocator('#myIframe').getByRole('link', { name: 'Shop' }).click();
  await page.frameLocator('#myIframe').getByRole('link', { name: '' }).click();
  await page.frameLocator('#myIframe').getByRole('link', { name: 'About' }).click();
});
