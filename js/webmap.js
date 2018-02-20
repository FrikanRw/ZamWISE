$(document).ready(function() {
  if (typeof(Storage) !== "undefined") {

  } else {
    alert("Your browser is unsupported by this tool please use Chrome or Firefox!");
  }
});

var id;
var name;
var country;
var type;
var desc;
var status;
var capital;
var omcost;
var exceperiod;
var contactde;
var options = {
  timeout: 5000
};
var Zoomoptions = {
  timeout: 5000
}


map = new L.Map(document.getElementById('map')).setView([-15.7701, 26.02003], 3);
map.spin(true, {
  lines: 13,
  length: 40
});

var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,

  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var Esri_WorldImagery = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJpa2FucnciLCJhIjoiY2lzd3NmejJvMDAyazJ5cGRscmx1a2pyOCJ9.TNL8UhbgzlL9GC1rj8gaRA', {
  opacity: 0.48,
  attribution: 'Tiles Source: <a href="https://www.mapbox.com/">Mapbox&copy</a>'
}).addTo(map);


//Load Projects GeoJson from Geoserver
var geoJsonUrl = "http://frikancarto.co.za:8080/geoserver/ZAMWIS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ZAMWIS:invent112017&outputFormat=text%2Fjavascript&format_options=callback:handleJson"
var projects = [];

$.ajax({

  jsonp: true,
  url: geoJsonUrl,
  dataType: 'jsonp',
  success: handleJson
});
var counter = 0

function handleJson(data) {

  L.geoJson(data, {

    onEachFeature: function(feature, projects_layer) {

      projects_layer.bindPopup('<b><center>PROJECT INFORMATION</b>' + '<center> Project Name:' + feature.properties.project_na + '<center> Project Type: ' + feature.properties.project_ty + '<center> Country : ' + feature.properties.country);
      //Pushes everything into JsonArray
      projects.push({

        "Internalid": counter,
        "ProjectName": feature.properties.project_na,
        "ParticipatingCountries": feature.properties.country,
        "ProjectObjectives": feature.properties.project_ty,
        "ProjectDescritpion": feature.properties.descp,
        "Status": feature.properties.status,
        "CapitalCost": feature.properties.capital,
        "O_MCost": feature.properties.fixedo_m,
        "ExecutionPeriod": feature.properties.date,
        "Contactdetails": feature.properties.contactde,
        "ProjectSponsors": feature.properties.owner,
        "ProjectDocumentation": feature.properties.source,
        "lat": feature.geometry.coordinates[1],
        "lon": feature.geometry.coordinates[0],

      });
      counter = counter + 1;
    },
    pointToLayer: function(feature, latlng) {

      return L.circleMarker(latlng, {
        radius: 4,
        fillColor: "#165dc7",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 1
      });

    }
  }).addTo(map);

  var listItems = '<option selected="selected" value="0">- Select -</option>';

  for (var i = 0; i < projects.length; i++) {
    listItems += "<option value='" + projects[i].Internalid + ". " + projects[i].ProjectName + "'>" + projects[i].Internalid + ". " + projects[i].ProjectName + "</option>";
  }
  console.log(projects)
  $("#searchID").html(listItems);
  populateTable(projects);
  map.spin(false);
};
//populates table from projects JsonArray
function populateTable(array) {
  let body = document.getElementById('TableBody')[0];
  let rowItems = null;

  for (row = 0; row < array.length; row++) {
    rowItems +=
      "<tr id=" + array[row].Internalid + "><td> " + array[row].ProjectName + "</td><td> " + array[row].ProjectObjectives + "</td><td> " + array[row].ParticipatingCountries + "</td><td> " + array[row].Status + "</td><td> " + array[row].ProjectSponsors + "</td><td> $ " + array[row].CapitalCost + "</td>"
  }
  $("#TableBody").html(rowItems);

}
//Search Function for input
$("#search").keyup(function(){
    var searchText = $(this).val().toLowerCase();
    // Show only matching TR, hide rest of them
    $.each($("#table tbody tr"), function() {
        if($(this).text().toLowerCase().indexOf(searchText) === -1)
           $(this).hide();
        else
           $(this).show();
    });
});

//Make project selecteable
$("#table tbody tr").click(function(){
   $(this).addClass('selected').siblings().removeClass('selected');
   var value=$(this).find('td:first').html();
   alert(value);
});


/*
search for project based on ID

function searchID() {
    id = document.getElementById('searchID').value;
    id = id.split(".");
    //name = document.getElementById('searchID').value;
    for (var i = 0; i < projects.length; i++) {
        if (projects[i].Internalid == id[0]) {
            name= projects[i].ProjectName;
            type = projects[i].ProjectObjectives;
            desc = projects[i].ProjectDescritpion;
            status = projects[i].Status;
            capital = projects[i].CapitalCost;
            omcost = projects[i].O_MCost;
            exceperiod = projects[i].ExecutionPeriod;
            contactde = projects[i].Contactdetails;
            country = projects[i].ParticipatingCountries;
            owner = projects[i].ProjectSponsors;
            ProjectDocumentation = projects[i].ProjectDocumentation;
            if (projects[i].lat !== null) {
                var cLatLon = L.latLng(projects[i].lat, projects[i].lon);
                map.setView(cLatLon, 12)
            } else {
                var box = L.control.messagebox(options).addTo(map);
            }
        }
    }
    document.getElementById('lblInternalLabel').innerHTML = id[0];
    document.getElementById('lblProjectname').innerHTML = name;
    document.getElementById('lblProjecttype').innerHTML = type;
    document.getElementById('lblProjectowner').innerHTML = country;
    localStorage.setItem("Internalid", id[0]);
    localStorage.setItem("ProjectName", name);
    localStorage.setItem("ParticipatingCountries", country);
    localStorage.setItem("ProjectObjectives", type);
    localStorage.setItem("ProjectDescritpion", desc);
    localStorage.setItem("Status", status);
    localStorage.setItem("CapitalCost", capital);
    localStorage.setItem("O_MCost", omcost);
    localStorage.setItem("ExecutionPeriod", exceperiod);
    localStorage.setItem("Contactdetails", country);
    localStorage.setItem("Sponsors", owner);
    localStorage.setItem("ProjectDocumentation", ProjectDocumentation);
    document.getElementById("print").disabled = false;
};
*/
