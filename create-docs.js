const fs = require('fs').promises
const marked = require('marked')

async function main () {
  try {
    const fileMarkdownString = await fs.readFile('README.md')
    let htmlString = marked(fileMarkdownString.toString())

    htmlString = htmlString.replace(/\/docs\/perf.png/, 'perf.png')
    htmlString = htmlString.replace(
      /docs\/logo-gradient.svg/,
      'logo-gradient.svg'
    )
    htmlString = htmlString.replace(
      /public\/logo.svg/,
      'logo.svg'
    )

    const template = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
        rel="stylesheet"
        href="styles.css"
      />
        <title>conch | Reaper</title>
      </head>
    
      <body>
        <header class="container-boundaries">
          <div class="flex flex-center">
            <div>
              <h3>
                Conch
                <br />
                <small class="fw-normal no-wrap">Micro library for batch running promises</small>
              </h3>
              <nav>
                <a href="https://github.com/barelyhuman/conch"> Github </a>
              </nav>
            </div>
            <div class="ml-auto">
              <button id="darkModeToggle" class="no-border icon"></button>
            </div>
          </div>
        </header>
        <main class="container-boundaries">${htmlString}</main>
        <footer>
          <div class="container-boundaries text-center fw-bold">
            2021 &copy;
            <a target="blank" href="https://reaper.im">Reaper</a>
          </div>
        </footer>
        <script
          type="text/javascript"
          src="https://unpkg.com/feather-icons@4.28.0/dist/feather.min.js"
        ></script>
        <script src="https://www.unpkg.com/@barelyreaper/themer/dist/index.umd.js"></script>
        <script>
          new Themer({ trigger: document.getElementById('darkModeToggle') });
        </script>
      </body>
    </html>    
        `

    await fs.writeFile('docs/index.html', template)
  } catch (err) {
    console.error(err)
    throw err
  }
}

main()
