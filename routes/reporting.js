var express = require('express'),
        router = express.Router();
/*** Reporting routes ***/
/*

The plan... Each page (home, category, post) has it's own id and row in this table. Rows are updated with views and unique views, mobile vs desktop.
| p_id | p_name | category | tags |views | unique views | mobile | desktop |

*/

module.exports = router;