import React, { Suspense } from "react";
import { NftDetails } from "@/components/nft-details";

const NftDetailsPage = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<NftDetails />
		</Suspense>
	);
};

export default NftDetailsPage;
