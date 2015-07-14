/**
 * Converts newline characters to HTML <br /> elements
 *
 * @author Adam Brewer - @adamcbrewer - adamcbrewer.com
 *
 * Usage: "String goes\n\rhere".nl2br();
 *
 */
let nl2br = function (text="") {

    return text.replace(/(\r\n|\n|\r)/gm, "<br />");

}

export { nl2br }
