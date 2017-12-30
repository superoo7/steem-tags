import { Router } from 'express';
import * as sql from 'mssql';
import { executeQuery } from '../db';

export default () => {
  let api = Router();
  api.get('/:id', (req, res) => {
    const query = `

select
 author,
 root_title as Titles,
 url,
 category,
 net_votes as Votes,
 pending_payout_value as PendingPayouts,
 children as Comments
from
 Comments (NOLOCK)
where
 dirty = 'False' and
 json_metadata LIKE('%"${req.params.id}"%') and
  parent_author = '' and
 datediff(day, created, GETDATE()) between 0 and 7
order by
 Votes desc


    `;

    executeQuery(res, query);
  });

  return api;
};
