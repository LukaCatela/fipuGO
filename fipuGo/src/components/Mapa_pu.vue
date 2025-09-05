<template>
    <div class="h-full w-full flex flex-col gap-2 p-2">
        <div id="map" class="flex-1 w-full"></div>

        <!--Kontrole layera-->
        <div class="mt-2 space-x-2">
            <button @click="sakrijLayer('bus-stops-layer')" :class="['px-4 py-2 font-semibold rounded-lg shadow-md transition', aktivniSlojevi['bus-stops-layer'] 
            ? 'bg-amber-400 text-black' 
            : 'bg-amber-100 text-black hover:bg-amber-300']">Stanice</button>
            <button @click="sakrijLayer('bus-route-layer')"   :class="[
          'px-4 py-2 font-semibold rounded-lg shadow-md transition',
          aktivniSlojevi['bus-route-layer'] 
            ? 'bg-amber-400 text-black' 
            : 'bg-amber-100 text-black hover:bg-amber-300'
        ]">Linije</button>
        </div>

    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

let map // globalna varijabla dostupna i unutar toggleLayer

const aktivniSlojevi = ref({
    'bus-stops-layer': true,
    'bus-route-layer': true,
});

function sakrijLayer(layerId) {
  if (!map.getLayer(layerId)) return // ako sloj ne postoji, prekini

  const visibility = map.getLayoutProperty(layerId, 'visibility')

  if (visibility === 'none' || !visibility) {
    map.setLayoutProperty(layerId, 'visibility', 'visible')
    aktivniSlojevi.value[layerId] = true;
  } else {
    map.setLayoutProperty(layerId, 'visibility', 'none')
    aktivniSlojevi.value[layerId] = false;
  }
};


onMounted(async ()=>{
// setupiranje mape

    map = new maplibregl.Map({
        container: 'map',
        style: 'https://tiles.openfreemap.org/styles/liberty', // openstreetmap
        center: [13.848, 44.867], // koordinate centra mape
        zoom: 13,
        maxZoom: 20,
        maxBounds: [
        [13.75, 44.80], 
        [13.95, 44.95]  
    ],
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.on('load', async() => {
        const responseStanice = await fetch('/data/stanice_Pula.json'); //dodat putanju
        const jsonDataStanice = await responseStanice.json();

        const resopnseLinija = await fetch('/data/linije_Pula.json');
        const jsonDataLinije = await resopnseLinija.json();


        map.addSource('stanice_Pula', {type: 'geojson', data: jsonDataStanice});
        map.addSource('linije_Pula', {type: 'geojson', data: jsonDataLinije});

        // Stanice
        map.addLayer({
        id: 'bus-stops-layer',
        type: 'circle',
        source: 'stanice_Pula',
        paint: {
            'circle-radius': 3,
            'circle-color': '#007bff',
        },
        layout: { visibility: 'visible' }, // početno vidljiv
        })

        // Linije
        map.addLayer({
            id: 'bus-route-layer',
            type: 'line',
            source: 'linije_Pula',
            layout: {
                'line-join': 'round',
                'line-cap': 'round',
                visibility: 'visible', // početno vidljiv
            },
            paint: {
                'line-color': [
                'match',
                ['get', 'name'],
                'Linija 1 - A.kolodvor-Stoja', '#ff4000',
                'Linija 2 - Veruda - Verudela', '#007bff',
                '#999999', // default siva
                ],
                'line-width': 2,
            },
        });

        map.on('click', 'bus-stops-layer', (e) => { 
            if (e.features.length > 0) { 
                const feature = e.features[0]; 
                const coordinates = feature.geometry.coordinates.slice(); 
                const stationName = feature.properties.Name || 'Naziv nije dostupan'; 
                const contentPopup = `<strong> ${stationName}</strong>`;
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) { 
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360; } 
                    new maplibregl.Popup() 
                    .setLngLat(coordinates) 
                    .setHTML(contentPopup) 
                    .addTo(map); 
            } 
        });  

        map.on('click', 'bus-route-layer', (e)=> {
            if(e.features.length > 0){
                const feature = e.features[0];
                const routeName = feature.properties.name;

                const coordinateMouse = e.lngLat;
                new maplibregl.Popup()
                .setLngLat(coordinateMouse)
                .setHTML(routeName)
                .addTo(map)
            }
        })

        map.on('mouseenter', 'bus-stops-layer', () => { map.getCanvas().style.cursor = 'pointer'; }); 
        map.on('mouseleave', 'bus-stops-layer', () => { map.getCanvas().style.cursor = ''; });
        map.on('mouseenter', 'bus-route-layer', () => { map.getCanvas().style.cursor = 'pointer'; }); 
        map.on('mouseleave', 'bus-route-layer', () => { map.getCanvas().style.cursor = ''; });
    });

});
</script>