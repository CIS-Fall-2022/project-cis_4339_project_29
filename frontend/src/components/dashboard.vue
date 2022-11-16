<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"> Welcome </h1>
    </div>
  </main>
  <section class="container">
      <div class="column">
        <h3 class="font-bold text-4xl text-Black-700 tracking-widest text-center mt-10"> Bar Chart - Attendees Per Event</h3>
        <div>
          <div>
            <AttendeeBar
              v-if="!loading && !error"
              :label="labels"
              :chart-data="attendees"
            ></AttendeeBar>

            <!-- Start of loading animation -->
            <div class="mt-40" v-if="loading">
              <p
                class="
                  text-6xl
                  font-bold
                  text-center text-gray-500
                  animate-pulse
                "
              >
                Loading...
              </p>
            </div>
            <!-- End of loading animation -->

            <!-- Start of error alert -->
            <div class="mt-12 bg-red-50" v-if="error">
              <h3 class="px-4 py-1 text-4xl font-bold text-white bg-red-800">
                {{ error.title }}
              </h3>
              <p class="p-4 text-lg font-bold text-red-900">
                {{ error.message }}
              </p>
            </div>
            <!-- End of error alert -->
            <br />
            <br />
          </div>
        </div>
      </div>
  </section>
</template>

<script>
// export default {
//   methods: {
//     routePush(routeName) {
//       this.$router.push({ name: routeName });
//     },
//   },
// };

import axios from "axios";
import AttendeeBar from "@/components/BarChartComponent.vue";

export default {
  components: {
    AttendeeBar
  },
  data() {
    return {
      labels: [],
      attendees: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        this.error = null;
        this.loading = true;
        const url = import.meta.env.VITE_ROOT_API + `/eventData/count`;
        const response = await axios.get(url);
        //"re-organizing" - mapping json from the response
        this.labels = response.data.map((item) => item.eventName);
        this.attendees = response.data.map((item) => item.attendees);
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          this.error = {
            title: "Server Response",
            message: err.message,
          };
        } else if (err.request) {
          // client never received a response, or request never left
          this.error = {
            title: "Unable to Reach Server",
            message: err.message,
          };
        } else {
          // There's probably an error in your code
          this.error = {
            title: "Application Error",
            message: err.message,
          };
        }
      }
      this.loading = false;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
