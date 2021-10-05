let fetchDataAndSort = async () => {
	let response = await fetch('http://api.armaanjain.tech/30days/leaderboard');
	let responseData = await response.json();
	// console.log(responseData);

	let data = Object.values(responseData.obj);
	data = data.filter(user=>user.Name!==undefined);
	data.forEach(obj => {
		obj.Quests = obj.Quests.substring(1, obj.Quests.length - 1).split(',');
		if (obj.Quests.length === 1 && !obj.Quests[0]) {
			obj.Quests = [];
		}
	});
	data.sort((a, b) => {
		if (a.Quests.length !== b.Quests.length) {
			return b.Quests.length - a.Quests.length;
		} else if (a.Date && b.Date) {
			if (
				new Date(a.Date.substring(7, a.Date.length - 1)).getTime() !==
				new Date(b.Date.substring(7, b.Date.length - 1)).getTime()
			) {
				return (
					new Date(a.Date.substring(7, a.Date.length - 1)).getTime() -
					new Date(b.Date.substring(7, b.Date.length - 1)).getTime()
				);
			} else {
				return a.Name.localeCompare(b.Name);
			}
		} else {
			return a.Name.localeCompare(b.Name);
		}
	});
	return data;
};
