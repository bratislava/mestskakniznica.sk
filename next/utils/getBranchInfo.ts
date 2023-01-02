import { BranchPlaceNestedEntityFragment } from '@bratislava/strapi-sdk-city-library'

export const getBranchInfo = (branch: BranchPlaceNestedEntityFragment | null | undefined) => {
  if (!branch) {
    return null
  }

  const { title, address, parentBranch } = branch.attributes ?? {}
  const { address: parentAddress } = parentBranch?.data?.attributes ?? {}

  return {
    title,
    address: address ?? parentAddress,
  }
}
