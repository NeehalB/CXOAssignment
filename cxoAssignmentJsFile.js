// This function is to create a bucket.
function newBuckets(name, volume) {
  return {
    name: name,
    volume: volume,
    emptyVolume: volume,
    contents: {},
  };
}

// this function is to get the volume of the balls.
function getBallVolume(color, ballVolumes) {
  return ballVolumes[color] || 0;
}

// This function is to place the balls inside the buckets
function placeBallInsideTheBuckets(bucket, color, numBalls, ballVolumes) {
  if (!bucket.contents[color]) {
    bucket.contents[color] = 0;
  }

  const ballVolume = getBallVolume(color, ballVolumes);

  // Ensure that the empty volume does not go below zero and is greater than zero.
  const maxBalls = Math.min(
    Math.floor(bucket.emptyVolume / ballVolume),
    numBalls,
    Math.floor(bucket.emptyVolume / ballVolume)
  );

  if (maxBalls > 0) {
    bucket.contents[color] += maxBalls;
    bucket.emptyVolume -= maxBalls * ballVolume;
  }
}

function suggestBallPlacement(buckets, availableBalls, ballVolumes) {
  buckets.sort((a, b) => a.emptyVolume - b.emptyVolume);

  for (const bucket of buckets) {
    for (const color in availableBalls) {
      const ballVolume = getBallVolume(color, ballVolumes);

      while (ballVolume <= bucket.emptyVolume && availableBalls[color] > 0) {
        placeBallInsideTheBuckets(bucket, color, 1, ballVolumes);
        availableBalls[color] -= 1;
      }
    }
  }
}

// Initialize buckets and available balls based on user input
const buckets = [];
const availableBalls = {};
const ballVolumes = {};

// Prompt the user for the number of buckets
const numBuckets = parseInt(prompt("Enter the number of buckets:"), 10);

for (let i = 1; i <= numBuckets; i++) {
  const volume = parseFloat(prompt(`Enter the volume for Bucket ${i}:`));
  buckets.push(newBuckets(`Bucket ${i}`, volume));
}

// Prompt the user for the number of each colored ball
const colors = ["Pink", "Red", "Blue", "Orange", "Green"];
for (const color of colors) {
  const ballVolume = parseFloat(prompt(`Enter the volume for ${color} balls:`));
  ballVolumes[color] = ballVolume;
  const numBalls = parseInt(prompt(`Enter the number of ${color} balls:`), 10);
  availableBalls[color] = numBalls;
}

suggestBallPlacement(buckets, availableBalls, ballVolumes);

for (const bucket of buckets) {
  let contents = [];
  for (const color in bucket.contents) {
    contents.push(`${bucket.contents[color]} ${color} balls`);
  }
  console.log(`${bucket.name}: Place ${contents.join(" and ")}`);
}

//The output is logged into the console.
