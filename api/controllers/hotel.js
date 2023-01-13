const createHotel=async(req,res,next)=>{
    const newHotel = new Hotel(req.body);
    try {
      const savedHotel = await newHotel.save();
      res.status(200).json(savedHotel);
      // console.log(savedHotel);
    } catch (err) {
     next(err);
    }
}
module.exports= createHotel;