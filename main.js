f = {
	l : {
		g : () => {
			let l = localStorage.getItem("todos");
			if (!!l)
				return JSON.parse(l);
			else
				return [];
		},
		p : (o) => {
			localStorage.setItem("todos", JSON.stringify(o));
		}
	},
	s : (s) => {
		return new Promise((resolve) => {
			setTimeout(resolve, s);
		});
	},
	a : async (o) => {
		document.querySelector("div.container.list").insertAdjacentHTML("afterbegin", `
		<todo uuid="${o.uuid}" state="ready">
			<div>
				<p class="todo-body">${o.body}</p>
				<button class="todo-comp" onclick="f.c('${o.uuid}');"></button>
			</div>
		</todo>
		`);
		let d = document.querySelector(`todo[uuid="${o.uuid}"]`);
		let m = window.getComputedStyle(d.children[0]);
		d.style.height = `${d.children[0].offsetHeight + parseFloat(m.marginTop) + parseFloat(m.marginTop)}px`;
		d.setAttribute("state", "");
	},
	n : (e = null) => {
		let v = document.querySelector("input").value;
		if ((!!e && e.key != "Enter") || !(!!v)) return false;
		let o = {
			uuid : crypto.randomUUID(),
			body : v
		};
		let d = f.l.g();
		d.push(o);
		f.l.p(d);
		f.a(o);
		document.querySelector("input").value = "";
	},
	c : async (uuid) => {
		let s = f.l.g();
		s = s.filter((s) => s.uuid != uuid);
		f.l.p(s);
		let d = document.querySelector(`todo[uuid="${uuid}"]`);
		d.style.height = 0;
		d.style.opacity = 0;
		await f.s(500);
		d.remove();
	}
};

window.onload = async () => {
	let r = [
		"ペンギンに餌をやる",
		"お湯を沸かす",
		"出汁を取る",
		"ちいかわを観る",
		"スタバの新作を眺める"
	];
	document.querySelector("input").setAttribute("placeholder", r[Math.floor(Math.random() * r.length)]);
	let l = f.l.g();
	for(let i=0; i<l.length; i++){
		f.a(l[i]);
	}
};