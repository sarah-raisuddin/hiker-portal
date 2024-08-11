const sarDashApi =
  "https://local-test-deployment-capstone-2024.azurewebsites.net//sar_dashboard";
const hikerPortalApi =
  "https://local-test-deployment-capstone-2024.azurewebsites.net//hiker_portal";

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

export const fetchProgress = async ({ uid }) => {
  const apiEndpoint = `${hikerPortalApi}/progress?uid=${uid}`;

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

export const archiveTripPlan = async ({ id }) => {
  const apiEndpoint = `${hikerPortalApi}/archive_trip_plan`;

  try {
    const response = await fetch(apiEndpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error during trip plan archiving:", error);
  }
};
