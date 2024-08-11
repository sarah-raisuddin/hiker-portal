const faqData = [
  {
    blockLabel: 'What is TrekCheck?',
    blockContent: `TrekCheck is a digital checkpoint system that aims to minimize 
    the time during which no information is available about a hiker’s location or status.
    Each hiker carries a tag which can be scanned at various checkpoint poles along a trail. 
    The hiker’s progress can then be monitored through our website  by friends, family, or 
    an emergency contact. In the event that a hiker goes missing during their hike, 
    Search and Rescue teams can utilize the information regarding the hiker’s progress 
    to aid in their rescue operations.`
  },
  {
    blockLabel: 'How does TrekCheck work?',
    blockContent: `TrekCheck is a digital trail checkpoint and progress monitoring system 
    that allows the user to log their current location over a certain interval across the trail. 
    The hiker carries an RFID tag and scans the tags at poles that are laid throughout the hike. 
    When a hiker scans their tag, the system logs their last known location with the timestamp 
    and uses satellite communication to transmit this information to a cloud database. From that
    database, the information is updated on both the Hiker Portal and SAR Dashboard. The Hiker 
    Portal is used by the hiker's emergency contact to monitor their trip and the SAR Dashboard
    is utilized by the SAR teams to find the hiker’s last location before they leave to perform 
    rescue operations.`,
  },
  {
    blockLabel: 'What trails currently have the TrekCheck system?',
    blockContent: `TrekCheck is currently still in the proof of concept stage of development. 
    Check back soon for updates regarding specific trails!`,
  },
  {
    blockLabel: 'Where can I pick up my tag?',
    blockContent: `Currently tags are only available to select testers of the system. 
    Check back soon for updates regarding where to purchase a tag!`,
  },
  {
    blockLabel: `What do I do if a hiker's progress hasn't updated`,
    blockContent: `Please stay calm and be patient, TrekCheck can provide additional insight into
    the last location the hiker checked in with the system but this information is not updated instantaneously.
    It may take a few hours or up to a day for progress to be updated. If there has been no updates regarding the
    hiker's progress within this window then please reach out to the appropriate park personel or Search and Rescue
    Organization.`,
  },
  {
    blockLabel: `What can I do to be more prepared in the outdoors?`,
    blockContent: `We are so glad you asked! Please refer to the adventure smart website (https://www.adventuresmart.ca)
    for some great resources about this topic.`,
  }
];

export default faqData;
