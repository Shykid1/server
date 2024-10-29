const { Order } = require("../models/order");
const { Rider } = require("../models/rider");
const clients = require("../wss.service");

const deliveryLiveLocationUpdate = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const { userId } = req.user;

    const location = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

    await Rider.findOneAndUpdate(
      { userId },
      {
        location,
        lastActive: new Date(),
      }
    );

    // Broadcast location to relevant clients
    if (clients.has(userId)) {
      const currentOrder = await Order.findOne({
        riderId: userId,
        status: { $in: ["ACCEPTED", "PICKED_UP"] },
      });

      if (currentOrder) {
        const userWs = clients.get(currentOrder.userId);
        if (userWs) {
          userWs.send(
            JSON.stringify({
              type: "LOCATION_UPDATE",
              data: { location, orderId: currentOrder._id },
            })
          );
        }
      }
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { deliveryLiveLocationUpdate };
