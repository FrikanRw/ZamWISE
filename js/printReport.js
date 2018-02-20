var columns = ["", "",];

var rows = [
    ['Project Title', localStorage.getItem("ProjectName")],
    ['Participating countries', localStorage.getItem("ParticipatingCountries")],
    ['Project Objectives', localStorage.getItem("ProjectObjectives")],
    ['Project Descritpion', "empty (no data available)"],
    ['Status', localStorage.getItem("Status")],
    ['Capital Cost (million US$)',  localStorage.getItem("CapitalCost")],
    ['O & M Cost (million US$)', localStorage.getItem("O_MCost")],
    ['Execution Period', localStorage.getItem("ExecutionPeriod")],
    ['Contact details', localStorage.getItem("Contactdetails")],
    ['Project Sponsors', localStorage.getItem("Sponsors")],
    ['Financier', "empty (no data available)"],
    ['Project Documentation', localStorage.getItem("ProjectDocumentation")],
    ['ZAMWIS tool', "http://vi.frikancarto.co.za/"]
];
function printReportpdf() {
    var pdf = new jsPDF('p', 'pt', 'A4');
    pdf.autoTable(columns, rows, {
      styles: {fillColor: [200, 210, 210],
              overflow: 'linebreak',},
      columnStyles: {
      	id: {fillColor: 255,
        overflow: 'linebreak',
        }
      },
      margin: {top: 170},
      addPageContent: function(data) {
      	pdf.text("General project information", 40, 30);
      }
  });
    pdf.save('projectReport_'+localStorage.getItem("ProjectName")+'.pdf');
  }
$( document ).ready(function() {
  document.getElementById("lblProjectname").innerHTML = localStorage.getItem("ProjectName");
  document.getElementById("lblcountries").innerHTML = localStorage.getItem("ParticipatingCountries");
  document.getElementById("lblObjectives").innerHTML = localStorage.getItem("ProjectObjectives");
  /*document.getElementById("lblDescritpion").innerHTML = localStorage.getItem("ProjectDescritpion");*/
  document.getElementById("lblStatus").innerHTML = localStorage.getItem("Status");
  document.getElementById("lblCapital").innerHTML = localStorage.getItem("CapitalCost");
  document.getElementById("lblO_MCost").innerHTML = localStorage.getItem("O_MCost");
  document.getElementById("lblExecution").innerHTML = localStorage.getItem("ExecutionPeriod");
  document.getElementById("lblContact").innerHTML = localStorage.getItem("Contactdetails");
  document.getElementById("lblsponsor").innerHTML = localStorage.getItem("Sponsors");
  document.getElementById("lbldocumentation").innerHTML = localStorage.getItem("ProjectDocumentation");


});
