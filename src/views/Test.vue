<template>
  <div class="container">
    <div>
      <h1 class="title">Barcode Reader</h1>
      <video width="640" height="480" autoplay></video>
      <v-quagga
        :onDetected="logIt"
        :readerSize="readerSize"
        :readerType="'code_128_reader'"
        :aspectRatio="aspectRatio"
      ></v-quagga>
    </div>
  </div>
</template>

<script>
export default {
  name: "VueBarcodeTest",
  data() {
    return {
      readerSize: {
        width: 640,
        height: 480
      },
      aspectRatio: { min: 1, max: 2 },
      detecteds: []
    };
  },
  methods: {
    logIt(data) {
      window.console.log("detected", data);
    }
  }
};
</script>
© 2020 GitHub, Inc.
