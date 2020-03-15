import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { Patient } from "./../src/pandemic.js";

$(document).ready(function() {
  let patient;

  $("#start").click(() => {
    patient = new Patient();
    patient.startInfection();
    const status = $(".square .status");
    const refreshHandler = setInterval(() => {
      $("#infection").text(patient.infectionLevel);
      status.css({ height: `${patient.infectionLevel}%` });
      if (patient.isDead()) {
        alert("You lost the game :(");
        clearInterval(refreshHandler);
        return;
      }
      if (patient.hasWon()) {
        alert("You won :)");
        clearInterval(refreshHandler);
      }
    }, 1000);
  });

  $("#nurse").click(function() {
    $(this).attr("disabled", true);
    patient.cure(() => {
      $(this).attr("disabled", false);
    });
  });
  $("#doctor").click(function() {
    $(this).attr("disabled", true);
    patient.cure2(() => {
      $(this).attr("disabled", false);
    });
  });
});
