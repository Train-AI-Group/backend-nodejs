function CalReward(tags)
  if not tags then
    error("tags are required")
  end

  -- Points table
  local POINTS = {
    fieldsOfStudy = {
      ["Computer Science"] = 5,
      ["Education"] = 4
    },
    domains = {
      ["Computer Vision"] = 5,
      ["NLP"] = 5
    },
    tasksOrMethods = {
      ["Classification"] = 5,
      ["Data Visualization"] = 4
    },
    cleanOrUnclean = {
      ["Clean"] = 5,
      ["Unclean"] = 2
    }
  }

  -- Calculate total points
  local totalPoints =
      (POINTS.fieldsOfStudy[tags.fieldsOfStudy] or 0) +
      (POINTS.domains[tags.domains] or 0) +
      (POINTS.tasksOrMethods[tags.tasksOrMethods] or 0) +
      (POINTS.cleanOrUnclean[tags.cleanOrUnclean] or 0)

  return totalPoints
end

Handlers.add("calReward", Handlers.utils.hasMatchingTag('Action', 'calReward'), function(msg)
  local tags = msg.Tags
  local result = CalReward(tags)
  -- print(result)

  return result
end)
