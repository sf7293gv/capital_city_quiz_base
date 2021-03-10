let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector("#user-answer")
let submitButton = document.querySelector("#submit-answer")
let resultTextElement = document.querySelector('#result')
let playAgainButton = document.querySelector("#again")

// TODO finish the script to challenge the user about their knowledge of capital cities.
// An array of country codes is provided in the countries.js file. 
// Your browser treats all JavaScript files as one big file, o
// organized in the order of the script tags so the countriesAndCodes array is available to this script.

// console.log(countriesAndCodes)  // You don't need to log countriesAndCodes - just proving it is available


// TODO when the page loads, select an element at random from the countriesAndCodes array         DONE
// TODO display the country's name in the randomCountryElement          DONE
// TODO add a click event handler to the submitButton.  When the user clicks the button,          DONE
//  * read the text from the userAnswerElement          DONE
//  * Use fetch() to make a call to the World Bank API with the two-letter country code (from countriesAndCodes, example 'CN' or 'AF')         DONE
//  * Verify no errors were encountered in the API call. If an error occurs, display an alert message.          DONE
//  * If the API call was successful, extract the capital city from the World Bank API response.         DONE
//  * Compare it to the user's answer.          DONE
//      You can decide how correct you require the user to be. At the minimum, the user's answer should be the same         DONE
//      as the World Bank data - make the comparison case insensitive.         DONE
//      If you want to be more flexible, include and use a string similarity library such as https://github.com/hiddentao/fast-levenshtein 
//  * Finally, display an appropriate message in the resultTextElement to tell the user if they are right or wrong.          DONE
//      For example "Correct! The capital of Germany is Berlin" or "Wrong - the capital of Germany is not G, it is Berlin"         DONE

let url = '';
let APIcountryNameResponse = '';

code();
function code() {



    let random = Math.floor(Math.random() * countriesAndCodes.length); // generate a random number between 0 and the length of the object
    let country = countriesAndCodes[random].name // the name of the random country
    let countryCode = countriesAndCodes[random]["alpha-2"] // the two letter random country code

    randomCountryElement.innerHTML = country // show the random country's name in the randomCountryElement

    submitButton.addEventListener('click', function () { // the submit button event listener

        let answer = userAnswerElement.value; // the user's answer
        if (! answer.length == 0) {

            randomCountryElement.innerHTML = country; // show the random country's name in the randomCountryElement

            url = `https://api.worldbank.org/v2/country/${countryCode}?format=json`; // the world bank's url with the random country code in it

            fetch(url).then((res) => { // a fetch call with the url in it, and the res variable will contain the response value in it
                return res.json()
            }).then((countryInfo) => { // this variable will contain the value.json in it (turned to a json response)

                APIcountryNameResponse = countryInfo[1][0]["capitalCity"]; // this variable will contain the result's capital city in it
                if (answer.toLowerCase() === APIcountryNameResponse.toLowerCase()) { // check if the user's answer matches the capital city that the API returne
                    resultTextElement.innerHTML = "Correct!" // if it does, show this
                } else {
                    resultTextElement.innerHTML = `Wrong the answer is: ${APIcountryNameResponse}` // if it does not, show this
                }

            }).catch((error) => { // if there is any errors, show this message to the user
                console.log("Error, ", error);
                alert("Error fetching data")
            });
        } else {
            alert("Enter a city name")
        }

    });
}


// TODO finally, connect the play again button. Clear the user's answer, select a new random country, 
// display the country's name, handle the user's guess. If you didn't use functions in the code you've 
// already written, you should refactor your code to use functions to avoid writing very similar code twice.

playAgainButton.addEventListener('click', function () {
    url = '';
    APIcountryNameResponse = '';
    userAnswerElement.value = '';
    resultTextElement.innerHTML = 'Result:';
    code();
});

