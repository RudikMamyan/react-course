import {useEffect, useRef} from "react";

export const useObserver = (ref, canLoad, isPostsLoading, callback) => {
	const observer = useRef();
	useEffect(() => {
		if (isPostsLoading) return;
		if (observer.current) observer.current.disconnect();
		const cb = function (entries) {
			if (entries[0].isIntersecting && canLoad) {
				callback()
			}
		};
		observer.current = new IntersectionObserver(cb);
		observer.current.observe(ref.current);
	}, [callback, canLoad, isPostsLoading, ref])
}