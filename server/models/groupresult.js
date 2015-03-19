var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupResultSchema = new Schema({
  groupid : {
    type: Schema.Types.ObjectId,
    ref: 'group',
    required : true,
    unique : true
  },
  result : [
      {
        foodid: {
        type: Schema.Types.ObjectId,
        ref: 'food'
        },
        value:{
          type: String,
        }
      }
  ],
  created : {
    type : Date,
    default : Date.now
  },

});

module.exports = mongoose.model('groupresult', GroupResultSchema);