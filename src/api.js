const sarDashApi = "http://localhost:3000/sar_dashboard";
const hikerPortalApi = "http://localhost:3000/hiker_portal";

export const fetchTrail = async ({ trailId }) => {
  // Replace with your API endpoint
  const apiEndpoint = `${sarDashApi}/trailInfo/${trailId}`;

  try {
    const response = await fetch(apiEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Successfully retrieved trail", data);
      return data;
    } else {
      console.error(
        "Error response from server:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error during trail fetch:", error);
  }
};

export const fetchProgress = async ({ uniqueLink }) => {
  const apiEndpoint = `${hikerPortalApi}/progress?unique_link=${encodeURIComponent(
    uniqueLink
  )}`;

  try {
    const response = await fetch(apiEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Successfully retrieved progress", data);
      return {
        tripPlan: data.tripPlan,
        checkpointEntries: data.checkpointEntries,
      };
    } else {
      console.error(
        "Error response from server:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error during progress fetch:", error);
  }
};
