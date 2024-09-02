export const mobilenavbarVariant = {
	initial: {
		opacity: 0,
		scale: 1,
	},
	animate: {
		scale: 1,
		opacity: 1,
		transition: {
			duration: 0.2,
			ease: "easeOut",
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.2,
			delay: 0.2,
			ease: "easeOut",
		},
	},
};

export const mobileLinkVar = {
	initial: {
		y: "-20px",
		opacity: 0,
	},
	open: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: "easeOut",
		},
	},
};

export const containerVariants = {
	open: {
		transition: {
			staggerChildren: 0.06,
		},
	},
};
